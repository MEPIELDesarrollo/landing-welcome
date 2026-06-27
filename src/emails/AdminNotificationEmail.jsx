import { Html, Body, Container, Heading, Text, Section, Hr, Img } from '@react-email/components';

export default function AdminNotificationEmail({ data }) {
  
  const logoUrl = 'https://res.cloudinary.com/dztucobrp/image/upload/v1781562376/MEPIEL-Distribuidores2_d9aluc.png';
  
  return (
    <Html>
      <Body style={{ 
        fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", 
        backgroundColor: '#f6f9fc', 
        padding: '40px 20px',
        margin: 0
      }}>
        <Container style={{ 
          backgroundColor: '#ffffff', 
          padding: '40px 50px', 
          borderRadius: '24px', 
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e8ecf1', 
          maxWidth: '600px', 
          margin: '0 auto' 
        }}>
          
          {/* Logo de la empresa */}
          <Section style={{ textAlign: 'center', marginBottom: '28px', backgroundColor: '#f7fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '10px'}}>
            <Img 
              src={logoUrl}
              alt="Logo de la empresa"
              width="150"
              height="auto"
              style={{ 
                display: 'inline-block',
                maxWidth: '150px',
                height: 'auto'
              }}
            />
          </Section>

         
          
          <Heading style={{ 
            color: '#1a1a2e', 
            fontSize: '22px', 
            fontWeight: '700', 
            textAlign: 'center', 
            margin: '0 0 16px 0',
            letterSpacing: '-0.025em',
            lineHeight: '1.4'
          }}>
            Se ha generado un nuevo pre-registro en el portal y está pendiente de validación.
          </Heading>
          
          <Text style={{ 
            fontSize: '15px', 
            lineHeight: '1.7', 
            color: '#4a5568', 
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            Por favor, revisa la información cargada por el cliente y realiza la aprobación correspondiente para continuar con su proceso de alta.
          </Text>

          {/* Tabla estilizada integrada para que los datos del formulario se lean de manera impecable */}
          <Section style={{ 
            backgroundColor: '#f7fafc', 
            padding: '24px', 
            borderRadius: '12px', 
            border: '1px solid #e2e8f0', 
            marginBottom: '32px' 
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', color: '#2d3748' }}>
              <tbody>
                 <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748', width: '40%' }}>Tipo pre-registro:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.tipoForm}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748', width: '40%' }}>Cédula Profesional:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.cedula}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Nombre Completo:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.nombre} {data.apellidoP} {data.apellidoM}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Fecha de Nacimiento:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.fechaNac}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Sexo:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.sexo === 'M' ? 'Masculino' : data.sexo === 'F' ? 'Femenino' : 'Otro'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Correo Electrónico:</td>
                  <td style={{ padding: '8px 0', color: '#394aa6' }}>{data.email}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Teléfono 1:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.tel1}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Teléfono 2:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.tel2 || 'No proporcionado'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Uso de CFDI:</td>
                  <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.cfdi}</td>
                </tr>
                {data.nombreNegocio && (
                  <>
                    <tr>
                      <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>Nombre del negocio:</td>
                      <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.nombreNegocio}</td>
                    </tr>
                  </>
                )}
                {data.urlNegocio && (
                  <>
                    <tr>
                      <td style={{ padding: '8px 0', fontWeight: '600', color: '#2d3748' }}>URL del negocio:</td>
                      <td style={{ padding: '8px 0', color: '#4a5568' }}>{data.urlNegocio}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </Section>
          
          <Text style={{ 
            fontSize: '15px', 
            color: '#2d3748', 
            fontWeight: '600', 
            textAlign: 'center', 
            margin: '0' 
          }}>
            Gracias.
          </Text>

          <Hr style={{ borderColor: '#e2e8f0', margin: '28px 0 16px 0' }} />
          
          <Text style={{ fontSize: '12px', color: '#718096', textAlign: 'center', margin: '0', lineHeight: '1.5' }}>
           Los documentos obligatorios (INE, Comprobante de domicilio y Constancia de situación fiscal) se encuentran adjuntos en este correo.
          </Text>

        </Container>
      </Body>
    </Html>
  );
}