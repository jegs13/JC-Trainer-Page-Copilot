# Jesús Castro Trainer Landing Page

Sitio Web para Jesús Castro.

Este proyecto fue desarrollado para **Jesús Oscar Castro Carreño**, un cliente en Buenos Aires, Argentina, con el fin de entregar a su público una guía de alimentación y entrenamiento que busca generar leads y mostrar planes personalizados de entreno.

## Mi Rol y Propiedad Intelectual

**Desarrollador/Diseñador**: Jesús Eduardo Giménez Sánchez

### Propiedad del Código
El código fuente (HTML, CSS, JS, Apps Script) es de mi autoría y está liberado bajo la **Licencia MIT**.

### Propiedad del Contenido
Los textos, imágenes, videos y la marca **Jesús Castro Trainer** son propiedad exclusiva del cliente.

### Stack Tecnológico
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend/Formularios**: Google Apps Script (gestión de formularios sin servidor)
- **Base de Datos**: Google Sheets
- **Despliegue/Control de Versiones**: GitHub

## Características

- ✅ Sección Hero con llamada a la acción
- ✅ Sección "Sobre Mí" con estudios, credenciales, experiencia y logros
- ✅ Video educativo integrado
- ✅ Sección de testimonios de alumnos
- ✅ Formulario de contacto completo con todos los campos solicitados
- ✅ Diseño completamente responsive
- ✅ Animaciones suaves y efectos visuales
- ✅ Navegación fluida entre secciones
- ✅ Todo en español

## Estructura de Archivos

```
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos CSS
├── script.js       # Funcionalidad JavaScript
└── README.md       # Este archivo
```

## Cómo Usar

1. **Abrir la página**: Simplemente abre `index.html` en tu navegador
2. **Personalizar el contenido**: Edita `index.html` para cambiar:
   - Información personal del entrenador
   - Estudios y credenciales
   - Experiencia y logros
   - Testimonios de alumnos
3. **Agregar tu video**: En la sección del video educativo, reemplaza la URL del iframe con el enlace de tu video de YouTube o Vimeo

## Personalización del Video

Para agregar tu propio video educativo:

1. Sube tu video a YouTube o Vimeo
2. Obtén el código de inserción (embed code)
3. En `index.html`, busca la sección del video (línea ~160)
4. Reemplaza `src="https://www.youtube.com/embed/dQw4w9WgXcQ"` con tu URL de video
5. Para YouTube: usa el formato `https://www.youtube.com/embed/ID_DEL_VIDEO`
6. Para Vimeo: usa el formato `https://player.vimeo.com/video/ID_DEL_VIDEO`

## Formulario de Contacto

El formulario incluye todos los campos solicitados:
- Nombre completo
- Correo electrónico
- Teléfono
- Ubicación
- Disponibilidad para entrenar
- Objetivos en el gimnasio
- Condiciones de salud
- Preferencia de contacto (con opción de WhatsApp, Email o Telegram)

**Nota**: Actualmente el formulario muestra un mensaje de éxito cuando se envía. Para que realmente envíe los datos, necesitarás:
- Un backend (PHP, Node.js, etc.) para procesar el formulario
- O usar un servicio como Formspree, EmailJS, o similar
- O configurar el action del formulario para apuntar a tu servidor

## Personalización de Colores

Puedes cambiar los colores principales editando las variables CSS en `styles.css` (líneas 8-15):

```css
:root {
    --primary-color: #ff6b35;    /* Color principal */
    --secondary-color: #004e89;  /* Color secundario */
    --dark-color: #1a1a1a;       /* Color oscuro */
    --light-color: #f8f9fa;      /* Color claro */
}
```

## Responsive Design

La página está completamente optimizada para:
- 📱 Móviles
- 📱 Tablets
- 💻 Desktop

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

**Copyright © 2025**

**Desarrollador/Diseñador**: Jesús Eduardo Giménez Sánchez  
**Propietario del Código**: Jesús Eduardo Giménez Sánchez (MIT License)  
**Propietario del Contenido**: Jesús Oscar Castro

### Términos de la Licencia MIT

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia de este software y sus archivos de documentación asociados (el "Software"), para utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del Software, y permitir a las personas a las que se les proporcione el Software hacer lo mismo, sujeto a las siguientes condiciones:

- El aviso de copyright anterior y este aviso de permiso deberán incluirse en todas las copias o partes sustanciales del Software.

**EL SOFTWARE SE PROPORCIONA "TAL COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.**

Para más detalles sobre la Licencia MIT, consulta [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT).

---

**Nota**: Los textos, imágenes, videos y contenido de marca (Jesús Castro Trainer) son propiedad exclusiva del cliente y no están cubiertos por la licencia MIT del código. El cliente retiene todos los derechos sobre su contenido.


## Próximos Pasos

1. Personalizar toda la información del entrenador
2. Agregar tu video educativo
3. Reemplazar testimonios con comentarios reales de clientes
4. Configurar el backend para el formulario de contacto
5. Agregar fotos personales si lo deseas
6. Configurar un dominio y hosting para publicar online

## Soporte

Si necesitas ayuda para personalizar la página o agregar funcionalidades adicionales, no dudes en contactarme.

---

¡Buena suerte con tu landing page! 💪

