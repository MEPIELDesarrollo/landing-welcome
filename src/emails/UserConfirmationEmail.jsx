import { Html, Body, Container, Heading, Text, Section, Img } from '@react-email/components';

export default function UserConfirmationEmail() {
  
  const logoUrl = 'https://res.cloudinary.com/dztucobrp/image/upload/f_auto,q_auto/v1781562376/MEPIEL-Distribuidores2_d9aluc.png';
  
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
          <Section style={{ textAlign: 'center', marginBottom: '28px' }}>
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
            fontSize: '24px', 
            fontWeight: '700', 
            textAlign: 'center', 
            margin: '0 0 20px 0',
            letterSpacing: '-0.025em',
            lineHeight: '1.3'
          }}>
            ¡Gracias por realizar tu pre-registro!
          </Heading>
          
          <Text style={{ 
            fontSize: '15px', 
            lineHeight: '1.7', 
            color: '#4a5568', 
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            Hemos recibido correctamente tu información. Nuestro equipo revisará los datos proporcionados y, una vez validados, te enviaremos una confirmación por este mismo medio para informarte que tu alta ha sido completada exitosamente.
          </Text>
          
          <Text style={{ 
            fontSize: '15px', 
            lineHeight: '1.7', 
            color: '#4a5568', 
            marginBottom: '28px',
            textAlign: 'center'
          }}>
            Agradecemos tu interés en formar parte de nuestra comunidad. Si necesitamos información adicional, nos pondremos en contacto contigo.
          </Text>
          
          {/* Contenedor destacado para la bienvenida */}
          <Section style={{ 
            background: 'linear-gradient(135deg, #394aa6 0%, #4a74bc 100%)',
            padding: '20px 32px', 
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(57, 74, 166, 0.2)'
          }}>
            <Text style={{ 
              fontSize: '20px', 
              fontWeight: '700', 
              color: '#334155', 
              margin: '0',
              letterSpacing: '0.03em'
            }}>
              ¡Bienvenido(a)!
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}