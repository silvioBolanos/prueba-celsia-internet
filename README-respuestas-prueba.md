Respuestas Prueba

¿Qué mecanismos de seguridad incluirías en la aplicación para
garantizar la protección del acceso a los datos?

Incluiria mecanimos de sesiones por usuario y autenticación por tokens, para que solo teniendo un usuario autorizado pudiera ingresar a la data y una 
vez el token se termine te saque y debas volver a ingresar

¿Qué estrategia de escalabilidad recomendarías para la aplicación
considerando que el crecimiento proyectado será de 1,000,000 de clientes
por año?

agregaria una infraestructura de codigo escalable y separaria los servicios en micro servicios 
para que estos se ejecuten por separado y si hay un error con uno no afecvte a los demas 

¿Qué patrón o patrones de diseño recomendarías para esta solución y
cómo se implementarían?

2.5. ¿Qué recomendaciones harías para optimizar el manejo y la persistencia
de datos de la aplicación, teniendo en cuenta que esta aplicación tiene una
alta transaccionalidad?

agregaria funciones asyncronas que esperen por las respuestas del servidor y si un usuario manda muchas peticiones que 
pueda blockear la operacion por unos segundos mientras terminan de responder los servicios



Explica la diferencia entre un router y un switch. ¿Cuándo usarías cada uno?
• RTA:
3.2. Describe las siete capas del modelo OSI y menciona brevemente la
función principal de cada una
• RTA:
3.3. Explica las diferencias entre los protocolos TCP y UDP. Dar un ejemplo
de cuándo usarías cada uno?
• RTA:
3.4. ¿Qué es una máscara de subred y cómo se utiliza para dividir una red en
subredes más pequeñas?
• RTA:
3.5. ¿Puedes mencionar algunos protocolos de enrutamiento dinámico y
explicar brevemente cómo funcionan?
