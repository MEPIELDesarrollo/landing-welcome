'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';


const TOTAL_STEPS = 3;

// ─── Reusable field components ────────────────────────────────────────────────

function TextInput({ label, id, required, value, onChange, placeholder = '', error }) {
  
  const handleChange = (inputValue) => {
    // 1. FILTRO DE FECHA DE NACIMIENTO (Solo números y autocompletado de /)
    if (id === 'fechaNac') {
      const nums = inputValue.replace(/\D/g, ""); // Borra todo lo que no sea número
      const sliced = nums.slice(0, 8);           // Máximo 8 dígitos (DDMMAAAA)

      let formatted = sliced;
      if (sliced.length > 2 && sliced.length <= 4) {
        formatted = `${sliced.slice(0, 2)}/${sliced.slice(2)}`;
      } else if (sliced.length > 4) {
        formatted = `${sliced.slice(0, 2)}/${sliced.slice(2, 4)}/${sliced.slice(4)}`;
      }
      onChange(formatted);
      return;
    }

    // 2. FILTRO DE TELÉFONOS (Solo números, máximo 10 dígitos, remueve signos extraños)
    if (id === 'tel1' || id === 'tel2') {
      const nums = inputValue.replace(/\D/g, ""); // Remueve letras, espacios y caracteres especiales
      const sliced = nums.slice(0, 10);          // Freno estricto a 10 caracteres
      onChange(sliced);
      return;
    }

    // Comportamiento regular para otros inputs
    onChange(inputValue);
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-white text-sm mb-1 fuente-montserrat-regular">
        {label}
        {required && <span className="text-pink-300 ml-0.5">*</span>}
      </label>
      <input
        id={id}
       type={id === 'email' ? 'email' : 'text'}
        /* 2. Si es fechaNac o teléfono, activa el teclado numérico nativo en celulares */
        inputMode={id === 'fechaNac' || id === 'tel1' || id === 'tel2' ? 'numeric' : 'text'}
        required={required}
        value={value}
        /* 3. Escuchamos a nuestra función procesadora interna */
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        /* Añadimos restricciones de longitud mínima para disparar alertas nativas HTML5 */
        minLength={id === 'fechaNac' ? 10 : (id === 'tel1' ? 10 : undefined)}
        maxLength={id === 'fechaNac' ? 10 : (id === 'tel1' || id === 'tel2' ? 10 : undefined)}
        className="w-full bg-white/0 border-2 rounded-md text-white placeholder-white/100 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all hover:bg-white/10 ${error ? 'border-red-400' : 'border-white/70'}"
      />

      {error && (
        <p className="mt-1 text-sm text-yellow-200 fuente-montserrat-regular">
          {error}
        </p>
      )}
    </div>
  );
}

function FileInput({ label, id, required, value, onChange }) {

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      onChange(null);
      return;
    }

    // 1. Validar Tipo de Archivo (Imágenes y PDFs)
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Formato no válido. Solo se permiten imágenes (JPG, PNG, WEBP) o documentos PDF.");
      e.target.value = ""; // Limpia el input nativo
      onChange(null);
      return;
    }

    // 2. Validar Peso Máximo (20 MB = 20 * 1024 * 1024 bytes)
    const maxSizeBytes = 20 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error("El archivo es demasiado grande. El peso máximo permitido es de 20 MB.");
      e.target.value = ""; // Limpia el input nativo
      onChange(null);
      return;
    }

    onChange(file);

  };
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-white text-sm mb-1 fuente-montserrat-regular">
        {label}
        {required && <span className="text-pink-300 ml-0.5">*</span>}
      </label>
      <label
        htmlFor={id}
        className="w-full bg-white/0 border-2 border-white/100 rounded-md text-white/100 text-sm px-3 py-2 cursor-pointer hover:bg-white/10 transition-all flex items-center gap-2"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="truncate">
          {value ? value.name : 'Seleccionar archivo…'}
        </span>
        <input
          id={id}
          type="file"
         // required={required}
          /* accept: Restringe visualmente en el explorador de archivos del usuario */
          accept="image/*, application/pdf"
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}

function SelectInput({ label, id, required, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-white text-sm mb-1 fuente-montserrat-regular">
        {label}
        {required && <span className="text-pink-300 ml-0.5">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/0 border-2 rounded-md text-white placeholder-white/100 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all hover:bg-white/10 ${error ? 'border-red-400' : 'border-white/70'}"
      >
        <option value="" className="text-gray-800">Seleccionar…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-gray-800">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Step indicator: barras horizontales ──────────────────────────────────────

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-5 mt-2">
      {Array.from({ length: total }).map((_, i) => {
        const step   = i + 1;
        const done   = step < current;
        const active = step === current;
        return (
          <div
            key={i}
            className={`
              h-[3px] w-50 mr-2 rounded-full transition-all duration-300 border-3
              ${active ? 'border-white/60 bg-white'        : ''}
              ${done   ? 'border-white/25 bg-white/25'     : ''}
              ${!active && !done ? 'border-white/25 bg-white/25' : ''}
            `}
          />
        );
      })}
    </div>
  );
}

// ─── Nav buttons ───────────────────────────────────────────────────────────────
 
export function NavButtons({ step, totalSteps, onBack, onNext, onSubmit }) {
  const btn =
    'px-8 py-2.5 rounded-full bg-[#dfe5f1] text-[#576284] shadow-md text-sm fuente-montserrat-regular hover:bg-white transition-all tracking-widest uppercase cursor-pointer';
 
  return (
    /*
      Este div vive FUERA del card en PreRegistroForm.
      - relative + w-full para poder posicionar abs los botones laterales
      - h-11 es la altura del botón; translate-y-[-50%] lo sube para
        que quede mitad dentro / mitad fuera del borde inferior del card
    */
    <div className="relative w-full h-11" style={{ transform: 'translateY(-50%)' }}>
 
      {/* ── Step 1: solo Continuar centrado ── */}
      {step === 1 && (
        <div className="flex justify-center">
          <button onClick={onNext} type="button" className={btn}>Continuar</button>
        </div>
      )}
 
      {/* ── Step 2: Atrás izquierda + Enviar derecha ── */}
      {step === 2 && (
        <>
          <div className="absolute left-20 top-0">
            <button onClick={onBack} type="button" className={btn}>Atrás</button>
          </div>
          <div className="absolute right-20 top-0">
            <button onClick={onSubmit} type="button" className={btn}>Enviar</button>
          </div>
        </>
      )}
 
      {/* ── Step 3: Atrás izquierda + Finalizar centrado ── */}
      {step === 3 && (
        <>
          {/*<div className="absolute left-0 top-0">
            <button onClick={onBack} type="button" className={btn}>Atrás</button>
          </div>*/}
          <div className="flex justify-center">
            <Link href="/">
              <button type="button" className={btn}>Finalizar</button>
            </Link>
          </div>
        </>
      )}
 
    </div>
  );
}

// ─── Step 1: Datos Personales ──────────────────────────────────────────────────

function Step1({ data, setData, fechaError }) {
  const set = (key) => (val) => setData((prev) => ({ ...prev, [key]: val }));

  return (
    <>
      
      <h2 className="text-white text-2xl md:text-3xl font-extrabold fuente-montserrat-bold text-center tracking-widest mt-8 mb-2 uppercase">
        Datos Personales
      </h2>

      <hr className="border-white/80 border-1 mt-3 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 pb-6">
        <TextInput label="Cédula profesional" id="cedula" required value={data.cedula} onChange={set('cedula')} />
        <TextInput label="Nombre (s)" id="nombre" required value={data.nombre} onChange={set('nombre')} />
        <TextInput label="Apellido Paterno" id="apellidoP" required value={data.apellidoP} onChange={set('apellidoP')} />
        <TextInput label="Apellido Materno" id="apellidoM" required value={data.apellidoM} onChange={set('apellidoM')} />
        <div className="w-full ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <TextInput label="Fecha de nacimiento" id="fechaNac" required value={data.fechaNac} onChange={set('fechaNac')} placeholder="DD/MM/AAAA" error={fechaError}/>
            <SelectInput
              label="Sexo"
              id="sexo"
              required
              value={data.sexo}
              onChange={set('sexo')}
              options={[
                { value: 'M', label: 'Masculino' },
                { value: 'F', label: 'Femenino' },
                { value: 'O', label: 'Otro' },
              ]}
            />
          </div>
        </div>
        <div className="w-full">
          <TextInput label="Correo Electrónico" id="email" required value={data.email} onChange={set('email')} placeholder="ejemplo@correo.com" />
        </div>
        <TextInput label="Teléfono 1" id="tel1" required value={data.tel1} onChange={set('tel1')} placeholder="10 dígitos" />
        <TextInput label="Teléfono 2" id="tel2" required={false} value={data.tel2} onChange={set('tel2')} placeholder="Opcional" />
      </div>
    </>
  );
}

// ─── Step 2: Documentos ────────────────────────────────────────────────────────

function Step2({ data, setData }) {
  const set = (key) => (val) => setData((prev) => ({ ...prev, [key]: val }));

  return (
    <>
      
      <h2 className="text-white text-2xl md:text-3xl font-extrabold fuente-montserrat-bold text-center tracking-widest mt-8 mb-2 uppercase">
        Datos Personales
      </h2>
      <hr className="border-white/80 border-1 mb-6" />
      <div className="flex flex-col gap-4 pb-9">
        <TextInput label="URL del negocio" id="urlNegocio" required value={data.urlNegocio} onChange={set('urlNegocio')} />
        <SelectInput
          label="Uso de CFDI"
          id="cfdi"
          required
          value={data.cfdi}
          onChange={set('cfdi')}
          options={[
            { value: 'G01', label: 'G01 - Adquisición de mercancías' },
            { value: 'G02', label: 'G02 - Devoluciones, descuentos o bonificaciones' },
            { value: 'G03', label: 'G03 - Gastos en general' },
            { value: 'I01', label: 'I01 - Construcciones'},
            { value: 'I02', label: 'I02 - Mobiliario y equipo de oficina para inversiones'},
            { value: 'I03', label: 'I03 - Equipo de transporte'},
            { value: 'I04', label: 'I04 - Equipo de cómputo y accesorios'},
            { value: 'I05', label: 'I05 - Dados, troqueles, moldes, matrices y herramental'},
            { value: 'I06', label: 'I06 - Comunicaciones telefónicas'},
            { value: 'I07', label: 'I07 - Comunicaciones satelitales'},
            { value: 'I08', label: 'I08 - Otra maquinaria y equipo'},
            { value: 'D01', label: 'D01 - Honorarios médicos, dentales y hospitalarios'},
            { value: 'D02', label: 'D02 - Gastos médicos por incapacidad o discapacidad'},
            { value: 'D03', label: 'D03 - Gastos funerales'},
            { value: 'D04', label: 'D04 - Donativos'},
            { value: 'D05', label: 'D05 - Intereses reales pagados por créditos hipotecarios'},
            { value: 'D06', label: 'D06 - Aportaciones voluntarias al SAR'},
            { value: 'D07', label: 'D07 - Primas de seguros de gastos médicos'},
            { value: 'D08', label: 'D08 - Gastos de transportación escolar obligatoria'},
            { value: 'D09', label: 'D09 - Depósitos en cuentas para el ahorro, primas de pensiones'},
            { value: 'D10', label: 'D10 - Pagos por servicios educativos (colegiaturas)'},
            { value: 'S01', label: 'S01 - Sin efectos fiscales'},
            { value: 'CP01', label: 'CP01 - Pagos'},
            { value: 'CN01', label: 'CN01 - Nómina'},
          ]}
        />
        <FileInput label="INE" id="ine" required value={data.ine} onChange={set('ine')} />
        <FileInput label="Comprobante de domicilio" id="compDom" required value={data.compDom} onChange={set('compDom')} />
        <FileInput
          label="Constancia de situación fiscal (mes en curso)"
          id="constancia"
          required
          value={data.constancia}
          onChange={set('constancia')}
        />
      </div>
    </>
  );
}

// ─── Step 3: Confirmación ──────────────────────────────────────────────────────

function Step3() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
     {/* <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-1">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="h-px w-24 bg-white/30" />*/}
      <h2 className="text-white text-4xl fuente-montserrat-regular leading-snug">
        ¡Gracias por completar<br />tu pre-registro!
      </h2>
      <p className="text-white/100 text-sm max-w-md">
        La información proporcionada será revisada y te enviaremos un correo electrónico una vez que tu registro sea confirmado.
      </p>
      <div className="h-px w-full bg-white/100 mt-12" />
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function FarmaciaForm({ onStepChange }) {
  const [step, setStep] = useState(1);
  const stepRef = useRef(step);
  const [loading, setLoading] = useState(false);

  const [step1Data, setStep1Data] = useState({
    cedula: '', nombre: '', apellidoP: '', apellidoM: '',
    fechaNac: '', sexo: '', email: '', tel1: '', tel2: '',
  });

  const [fechaError, setFechaError] = useState('');

  const [step2Data, setStep2Data] = useState({
    urlNegocio: '', cfdi: '', ine: null, compDom: null, constancia: null,
  });
  
  const notify = (newStep, isLoading = false) => {
    onStepChange?.({
      step:       newStep,
      totalSteps: TOTAL_STEPS,
      disabled:   isLoading,
      onBack:     handleBack,
      onNext:     handleFormSubmit,
      onSubmit:   handleFormSubmit,
    });
  };

  // VALIDACIÓN LÓGICA DE EDAD (Menores de 18 o años inválidos/muy viejos)
  const validarFechaNacimiento = (fechaStr) => {
    const partes = fechaStr.split('/');
    if (partes.length !== 3) return false;

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Enero es 0 en JS
    const anio = parseInt(partes[2], 10);

    const fechaNac = new Date(anio, mes, dia);
    const hoy = new Date();

    // Validar si la fecha existe en el calendario (ej: evita 31 de febrero)
    if (fechaNac.getFullYear() !== anio || fechaNac.getMonth() !== mes || fechaNac.getDate() !== dia) {
      setFechaError('Por favor, introduce una fecha de nacimiento válida.');

      toast.error(
        'Por favor, introduce una fecha de nacimiento válida.'
      );

      return false;
    }

    // Calcular edad exacta
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNac.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    if (edad < 18) {
      setFechaError('Debes ser mayor de 18 años para poder registrarte.');
      toast.error(
        'Debes ser mayor de 18 años para poder registrarte.'
      );
      return false;
    }

    if (edad > 105 || anio < 1920) {
      setFechaError('Por favor, introduce un año de nacimiento válido.');
      toast.error(
        'Por favor, introduce un año de nacimiento válido.'
      );
      return false;
    }

    setFechaError('');

    return true;
  };

  
  // Conversor asíncrono de un Objeto de Tipo File a string codificado en Base64
  const transformarArchivoBase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resolve({ name: archivo.name, content: lector.result });
      lector.onerror = (error) => reject(error);
    });
  };


  // Esta función se ejecuta ÚNICAMENTE si las validaciones HTML del navegador pasaron con éxito
  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Verificaciones manuales de lógica de negocio para el Paso 1
    if (step === 1) {
      if (!validarFechaNacimiento(step1Data.fechaNac)) {
        return; // Frena el flujo si no cumple los requisitos de edad
      }
      handleNext();
      return;
    }

    // Verificaciones manuales para los FileInput en el Paso 2 (al dar Enviar)
    if (step === 2) {
      if (!step2Data.ine) {
        toast.error("Por favor, selecciona tu archivo de INE.");
        return;
      }
      if (!step2Data.compDom) {
        toast.error("Por favor, selecciona tu Comprobante de domicilio.");
        return;
      }
      if (!step2Data.constancia) {
        toast.error("Por favor, selecciona tu Constancia de situación fiscal.");
        return;
      }

      // Detonamos proceso de envío
      setLoading(true);
      notify(step, true);

      try {
        // Ejecución en paralelo de la conversión binaria de los 3 documentos
        const adjuntosMapeados = await Promise.all([
          transformarArchivoBase64(step2Data.ine),
          transformarArchivoBase64(step2Data.compDom),
          transformarArchivoBase64(step2Data.constancia)
        ]);

        // Unificación de variables de texto
        const datosUnificados = { ...step1Data, cfdi: step2Data.cfdi, urlNegocio: step2Data.urlNegocio, tipoForm: "ECOMMERCE" };

        // Llamada fetch controlada
        const respuesta = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            textData: datosUnificados,
            files:    adjuntosMapeados
          })
        });

         if (!respuesta.ok) {
          // Extraemos el JSON de error enviado desde el backend (ej: "El correo ya existe")
          const errorData = await respuesta.json();
          throw new Error(errorData.error || "Respuesta de API incorrecta");
        }

        // Si el envío fue exitoso, avanzamos a la pantalla final de agradecimiento
        handleNext();

      } catch (error) {
        console.error("Error al despachar el formulario:", error);
        // Mostramos el mensaje exacto enviado por la Base de datos
        toast.error(error.message || "Hubo un problema al procesar tu solicitud. Por favor, verifica tu conexión e inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNext = () => {
    const s = Math.min(stepRef.current + 1, TOTAL_STEPS);
    stepRef.current = s;
    setStep(s);
    notify(s, false);
  };

  const handleBack = () => {
    const s = Math.max(stepRef.current - 1, 1);
    stepRef.current = s;
    setStep(s);
    notify(s, false);
  };

  useEffect(() => { notify(step, loading); }, [loading]);

  return (
    /* Envolvemos todo en la etiqueta HTML <form> conectada a nuestro submit handler */
    <form onSubmit={handleFormSubmit}>

      
      {loading && (
        <div className="absolute inset-0 rounded-[2rem] bg-black/60 z-50 flex flex-col items-center justify-center text-white backdrop-blur-sm animate-fade-in">
          <div className="w-12 h-12 border-4 border-t-[#394aa6] border-white/30 rounded-full animate-spin mb-4" />
          <p className="fuente-montserrat-bold text-lg tracking-wide text-center">Procesando y subiendo documentos...</p>
          <p className="text-xs text-white/70 mt-1 text-center">Por favor, espera un momento.</p>
        </div>
      )}

      {step < TOTAL_STEPS && (
        <p className="text-white/100 text-xs text-center mb-5 fuente-montserrat-regular">
          Ten a la mano tu INE, comprobante de domicilio y cédula profesional.
          Los campos marcados con <span className="text-pink-300">*</span> son obligatorios.
        </p>
      )}

      <StepIndicator current={step} total={TOTAL_STEPS} />

      {/*<h2 className="text-white text-3xl font-extrabold fuente-montserrat-bold text-center tracking-widest mt-4 mb-2 uppercase">
        {step === 1 ? 'Datos Personales' : step === 2 ? 'Documentos' : ''}
      </h2>
      {step < TOTAL_STEPS && <hr className="border-white/80 border-1 mt-3 mb-8" />}*/}

      {step === 1 && (
        <Step1
          data={step1Data}
          setData={setStep1Data}
          fechaError={fechaError}
        />
      )}
      {step === 2 && <Step2 data={step2Data} setData={setStep2Data} />}
      {step === 3 && <Step3 />}

      {/* Botón de envío invisible para ser accionado mediante la función puente de PreRegistroForm */}
      <button id="hidden-form-submit-btn" type="submit" className="hidden" />
    </form>
  );
}