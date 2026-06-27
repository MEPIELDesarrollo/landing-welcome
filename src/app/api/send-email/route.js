export const runtime = 'edge'; // El flag para Cloudflare Pages

import { Resend } from 'resend';
import { render } from '@react-email/render';
import { v2 as cloudinary } from 'cloudinary';
import sql from 'mssql';
import AdminNotificationEmail from '@/emails/AdminNotificationEmail';
import UserConfirmationEmail from '@/emails/UserConfirmationEmail';

// ─── CONFIGURACIÓN DE RESEND ─────────────────────────────────────────────────
    //const resend = new Resend(process.env.RESEND_API_KEY);

// ─── CONFIGURACIÓN DE CLOUDINARY ─────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── CONFIGURACIÓN DE SQL SERVER ─────────────────────────────────────────────
const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: {
    encrypt: true, 
    trustServerCertificate: true, // Requerido para entornos locales/desarrollo
    instanceName: process.env.DB_INSTANCE || undefined
  }
};

export async function POST(request) {
  try {

    // ─── CONFIGURACIÓN DE RESEND ─────────────────────────────────────────────────
    //const resend = new Resend(process.env.RESEND_API_KEY);
    const apiKey = process.env.RESEND_API_KEY || 're_placeholder_para_el_build';
    const resend = new Resend(apiKey);
    
    const body = await request.json();
    const { textData, files } = body;

    // 1. CONEXIÓN A BASE DE DATOS Y VALIDACIÓN DE DUPLICADOS
    let pool = await sql.connect(sqlConfig);
    
    const checkEmail = await pool.request()
      .input('email', sql.VarChar, textData.email)
      .query('SELECT id FROM PreRegistrosClientes WHERE email = @email');

    if (checkEmail.recordset.length > 0) {
      return Response.json(
        { error: 'El correo electrónico ya se encuentra registrado en nuestro sistema.' },
        { status: 400 }
      );
    }

   // 2. SUBIDA SEGURA Y PRIVADA A CLOUDINARY (Por posición de Arreglo, independiente del nombre)
    const uploadResults = {};
    
    // Mapeo estricto basado ÚNICAMENTE en el orden en que el frontend metió los archivos
    const tiposDeDocumento = ['ine', 'comprobante', 'constancia'];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Asignamos el tipo real por su posición ([0]=ine, [1]=comprobante, [2]=constancia)
      // Si subieran un 4to archivo por error, se llamará 'documento_extra_3'
      const docType = tiposDeDocumento[i] || `documento_extra_${i}`;

      // Extraemos la extensión original (.pdf, .jpg, etc.) de su nombre original para no perderla
      const extension = file.name.substring(file.name.lastIndexOf('.'));

      // Creamos un nombre limpio y corporativo para almacenar en Cloudinary de forma privada
      // Ejemplo resultado: "12345678_ine" o "12345678_comprobante"
      const nombrePublicoLimpio = `${textData.cedula}_${docType}`;

      const uploadResponse = await cloudinary.uploader.upload(file.content, {
        folder: `mepiel_preregistros/${textData.cedula}`,
        public_id: nombrePublicoLimpio, 
        resource_type: 'auto',
        type: 'private', 
        quality: 'auto', 
        flags: 'attachment' 
      });

      // URL firmada segura con expiración de 24 Horas
      const secureSignedUrl = cloudinary.url(uploadResponse.public_id, {
        sign_url: true,
        type: 'private',
        resource_type: uploadResponse.resource_type,
        expires_at: Math.floor(Date.now() / 1000) + 86400 
      });

      // Objeto temporal usando la clave limpia ('ine', 'comprobante', 'constancia')
      uploadResults[docType] = {
        public_id: uploadResponse.public_id,
        secure_url: secureSignedUrl
      };
    }

    // 3. IDENTIFICAR CAMPOS EXCLUSIVOS SEGÚN EL FORMULARIO
    // Inicializamos las variables exclusivas como null por defecto
    let nombreNegocioInput = null;
    let urlNegocioInput = null;

    // Evaluamos el tipo de formulario que viene del Frontend
    const tipoFormSuperior = textData.tipoForm ? textData.tipoForm.toUpperCase() : '';

    if (tipoFormSuperior.includes('FARMACIA')) {
      // Si tu input de farmacia se llama por ejemplo "nombreNegocio", lo capturas aquí
      nombreNegocioInput = textData.nombreNegocio || null; 
    } else if (tipoFormSuperior.includes('ECOMMERCE')) {
      // Si tu input de ecommerce se llama por ejemplo "urlNegocio", lo capturas aquí
      urlNegocioInput = textData.urlNegocio || null;
    }
    // Si es MEDICOS, ambos se quedan en null automáticamente

    // 4. INSERCIÓN DINÁMICA EN SQL SERVER
    await pool.request()
      .input('cedula', sql.VarChar, textData.cedula)
      .input('nombre', sql.VarChar, textData.nombre)
      .input('apellido_p', sql.VarChar, textData.apellidoP)
      .input('apellido_m', sql.VarChar, textData.apellidoM)
      .input('fecha_nac', sql.VarChar, textData.fechaNac)
      .input('sexo', sql.Char, textData.sexo)
      .input('email', sql.VarChar, textData.email)
      .input('tel1', sql.VarChar, textData.tel1)
      .input('tel2', sql.VarChar, textData.tel2 || null)
      .input('cfdi', sql.VarChar, textData.cfdi)
      .input('tipo_form', sql.VarChar, textData.tipoForm)
      
      // Enviamos las variables dinámicas mapeadas
      .input('nombre_negocio', sql.VarChar, nombreNegocioInput)
      .input('url_negocio', sql.VarChar, urlNegocioInput)
      
      .input('ine_id', sql.VarChar, uploadResults['ine']?.public_id || 'N/A')
      .input('url_ine', sql.VarChar, uploadResults['ine']?.secure_url || 'N/A')
      .input('comp_id', sql.VarChar, uploadResults['comprobante']?.public_id || 'N/A')
      .input('url_comp', sql.VarChar, uploadResults['comprobante']?.secure_url || 'N/A')
      .input('const_id', sql.VarChar, uploadResults['constancia']?.public_id || 'N/A')
      .input('url_const', sql.VarChar, uploadResults['constancia']?.secure_url || 'N/A')
      .query(`
        INSERT INTO PreRegistrosClientes 
        (tipo_formulario, cedula, nombre, apellido_paterno, apellido_materno, fecha_nacimiento, sexo, email, telefono_1, telefono_2, cfdi_uso, nombre_negocio, url_negocio, cloudinary_ine_id, url_ine, cloudinary_comprobante_id, url_comprobante, cloudinary_constancia_id, url_constancia)
        VALUES 
        (@tipo_form, @cedula, @nombre, @apellido_p, @apellido_m, @fecha_nac, @sexo, @email, @tel1, @tel2, @cfdi, @nombre_negocio, @url_negocio, @ine_id, @url_ine, @comp_id, @url_comp, @const_id, @url_const)
      `);

    // 4. PREPARACIÓN DE ADJUNTOS PARA EL CORREO DE RESEND
    const attachments = files.map((file) => {
      const base64Content = file.content.includes(',')
        ? file.content.split(',')[1]   
        : file.content;                
      return {
        filename: file.name,
        content:  base64Content,
      };
    });

    // 5. RENDERIZADO DE TEMPLATES Y ENVÍO DE CORREOS
    const adminHtml = await render(AdminNotificationEmail({ data: textData }));
    const userHtml = await render(UserConfirmationEmail({ nombre: textData.nombre }));

    // Correo al administrador (con archivos adjuntos físicos)
    const adminResult = await resend.emails.send({
      from:        '¡Nuevo pre-registro! <area.desarrollo@mepiel.com.mx>',  
      to:          'contacto@mepiel.com.mx',
      bcc:         'area.desarrollo@mepiel.com.mx',
      subject:     `NUEVA SOLICITUD PRE-REGISTRO - ${textData.tipoForm}: ${textData.nombre} ${textData.apellidoP}`,
      html:        adminHtml,
      attachments: attachments,
    });

    if (adminResult.error) {
      console.error('Resend admin error:', adminResult.error);
      throw new Error(`Error enviando correo admin: ${adminResult.error.message}`);
    }

    // Acuse de recibo al usuario final
    const userResult = await resend.emails.send({
      from:    '¡Pre-registro exitoso! - Mepiel <contacto@mepiel.com.mx>',
      to:      textData.email,
      bcc:     'contacto@mepiel.com.mx',
      subject: `¡Recibimos tu solicitud de pre-registro! ${textData.nombre} ${textData.apellidoP}`,
      html:    userHtml,
    });

    if (userResult.error) {
      console.error('Resend user error:', userResult.error);
    }

    return Response.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Error general en la ruta de pre-registro:', error);
    return Response.json(
      { error: error.message ?? 'Hubo un problema interno en el servidor.' },
      { status: 500 }
    );
  }
}