export interface DialogOption {
   id: string
   text: string
   isCorrect: boolean
 }
 
 // Modificar la interfaz Dialog para incluir audio
 export interface Dialog {
   character: string
   text: string
   options?: DialogOption[]
   correctAnswer?: string
   explanation: string
   audioUrl?: string
   points: number
 }
 
 // Modificar la interfaz Scenario para incluir niveles de dificultad más específicos
 export interface Scenario {
   id: string
   title: string
   description: string
   difficulty: "Principiante" | "Intermedio" | "Avanzado"
   dialogCount: number
   dialogs: Dialog[]
 }
 
 // Actualizar los escenarios existentes con audio y puntos
 export const scenarios: Scenario[] = [
   {
     id: "restaurant",
     title: "Restaurante",
     description: "Aprende a pedir comida y bebida en un restaurante",
     difficulty: "Principiante",
     dialogCount: 8, // Actualizado con más diálogos
     dialogs: [
       {
         character: "Camarero",
         text: "Good evening! Welcome to our restaurant. Do you have a reservation?",
         options: [
           { id: "opt1", text: "Yes, I have reservation for two people.", isCorrect: false },
           { id: "opt2", text: "Yes, I have a reservation for two people.", isCorrect: true },
           { id: "opt3", text: "Yes, I have two people.", isCorrect: false },
         ],
         explanation:
           "La respuesta correcta incluye el artículo 'a' antes de 'reservation'. En inglés, necesitamos usar el artículo indefinido antes de sustantivos contables singulares.",
         audioUrl: "/audio/restaurant/dialog1.mp3",
         points: 10,
       },
       {
         character: "Camarero",
         text: "What would you like to order?",
         options: [
           { id: "opt1", text: "I want fish, please.", isCorrect: true },
           { id: "opt2", text: "I want a fish.", isCorrect: false },
           { id: "opt3", text: "Fish, please.", isCorrect: false },
         ],
         explanation:
           "Aunque todas las opciones son comprensibles, 'I want fish, please' es la forma más correcta y educada de pedir un plato de pescado en un restaurante.",
         audioUrl: "/audio/restaurant/dialog2.mp3",
         points: 10,
       },
       {
         character: "Camarero",
         text: "Would you like something to drink with your meal?",
         correctAnswer: "I would like a glass of water",
         explanation:
           "Una buena respuesta incluye 'I would like' seguido del artículo y la bebida. 'I would like' es más formal y educado que 'I want'.",
         audioUrl: "/audio/restaurant/dialog3.mp3",
         points: 15,
       },
       {
         character: "Camarero",
         text: "How would you like your steak cooked?",
         options: [
           { id: "opt1", text: "Medium rare, please.", isCorrect: true },
           { id: "opt2", text: "I want medium rare.", isCorrect: false },
           { id: "opt3", text: "Cook medium rare.", isCorrect: false },
         ],
         explanation:
           "En este contexto, es común responder directamente con el término de cocción seguido de 'please'. No es necesario usar una oración completa.",
         audioUrl: "/audio/restaurant/dialog4.mp3",
         points: 10,
       },
       {
         character: "Camarero",
         text: "Would you like to see the dessert menu?",
         correctAnswer: "Yes, please",
         explanation:
           "Una respuesta corta y educada es apropiada aquí. 'Yes, please' es la forma estándar de aceptar una oferta en inglés.",
         audioUrl: "/audio/restaurant/dialog5.mp3",
         points: 5,
       },
       // Nuevos diálogos
       {
         character: "Camarero",
         text: "Is everything OK with your meal?",
         options: [
           { id: "opt1", text: "Yes, it's delicious, thank you.", isCorrect: true },
           { id: "opt2", text: "Yes, delicious.", isCorrect: false },
           { id: "opt3", text: "Good food.", isCorrect: false },
         ],
         explanation:
           "La respuesta más completa y educada es 'Yes, it's delicious, thank you'. Incluye un adjetivo positivo y un agradecimiento.",
         audioUrl: "/audio/restaurant/dialog6.mp3",
         points: 10,
       },
       {
         character: "Camarero",
         text: "Would you like to pay together or separately?",
         correctAnswer: "We would like to pay together, please",
         explanation: "Una respuesta completa y educada incluye 'we would like' seguido de la preferencia y 'please'.",
         audioUrl: "/audio/restaurant/dialog7.mp3",
         points: 15,
       },
       {
         character: "Camarero",
         text: "How would you like to pay?",
         options: [
           { id: "opt1", text: "By credit card, please.", isCorrect: true },
           { id: "opt2", text: "Credit card.", isCorrect: false },
           { id: "opt3", text: "I pay with card.", isCorrect: false },
         ],
         explanation:
           "La respuesta más formal y correcta es 'By credit card, please'. Usa la preposición 'by' para indicar el método de pago y añade 'please' para ser educado.",
         audioUrl: "/audio/restaurant/dialog8.mp3",
         points: 10,
       },
     ],
   },
   {
     id: "airport",
     title: "Aeropuerto",
     description: "Aprende a comunicarte en un aeropuerto",
     difficulty: "Intermedio",
     dialogCount: 7, // Actualizado con más diálogos
     dialogs: [
       {
         character: "Agente de check-in",
         text: "Good morning. May I see your passport and boarding pass, please?",
         options: [
           { id: "opt1", text: "Yes, here is.", isCorrect: false },
           { id: "opt2", text: "Yes, here they are.", isCorrect: true },
           { id: "opt3", text: "Yes, here are.", isCorrect: false },
         ],
         explanation:
           "Usamos 'here they are' porque nos referimos a dos objetos (pasaporte y tarjeta de embarque). El pronombre 'they' sustituye a estos dos objetos.",
         audioUrl: "/audio/airport/dialog1.mp3",
         points: 15,
       },
       {
         character: "Agente de seguridad",
         text: "Do you have any liquids in your carry-on luggage?",
         correctAnswer: "No, I don't have any liquids",
         explanation:
           "Una respuesta completa es mejor en este contexto. 'No, I don't have any liquids' es clara y directa.",
         audioUrl: "/audio/airport/dialog2.mp3",
         points: 10,
       },
       {
         character: "Pasajero",
         text: "Excuse me, where is gate B12?",
         options: [
           { id: "opt1", text: "Go straight and turn right.", isCorrect: false },
           { id: "opt2", text: "It's straight ahead and then turn right.", isCorrect: true },
           { id: "opt3", text: "Straight, then right.", isCorrect: false },
         ],
         explanation:
           "La respuesta más completa y clara es 'It's straight ahead and then turn right'. Incluye el sujeto 'it' y usa la expresión 'straight ahead' que es común para dar direcciones.",
         audioUrl: "/audio/airport/dialog3.mp3",
         points: 15,
       },
       {
         character: "Asistente de vuelo",
         text: "Would you like chicken or pasta for your meal?",
         correctAnswer: "I would like chicken, please",
         explanation:
           "Una respuesta educada incluye 'I would like' seguido de tu elección y 'please'. Esta es la forma más formal y cortés de responder a este tipo de preguntas.",
         audioUrl: "/audio/airport/dialog4.mp3",
         points: 10,
       },
       // Nuevos diálogos
       {
         character: "Agente de inmigración",
         text: "What is the purpose of your visit?",
         options: [
           { id: "opt1", text: "I'm here for business.", isCorrect: true },
           { id: "opt2", text: "Business.", isCorrect: false },
           { id: "opt3", text: "For work.", isCorrect: false },
         ],
         explanation:
           "La respuesta más completa y formal es 'I'm here for business'. Incluye un sujeto y verbo, y especifica claramente el propósito.",
         audioUrl: "/audio/airport/dialog5.mp3",
         points: 15,
       },
       {
         character: "Agente de inmigración",
         text: "How long will you be staying?",
         correctAnswer: "I'll be staying for two weeks",
         explanation:
           "Una buena respuesta incluye el tiempo futuro 'I'll be staying' seguido de la duración de la estancia.",
         audioUrl: "/audio/airport/dialog6.mp3",
         points: 20,
       },
       {
         character: "Agente de aduanas",
         text: "Do you have anything to declare?",
         options: [
           { id: "opt1", text: "No, I don't have anything to declare.", isCorrect: true },
           { id: "opt2", text: "Nothing.", isCorrect: false },
           { id: "opt3", text: "No declare.", isCorrect: false },
         ],
         explanation:
           "La respuesta más completa y correcta es 'No, I don't have anything to declare'. Es importante usar la negación completa en este contexto formal.",
         audioUrl: "/audio/airport/dialog7.mp3",
         points: 15,
       },
     ],
   },
   {
     id: "hotel",
     title: "Hotel",
     description: "Aprende a comunicarte en un hotel",
     difficulty: "Principiante",
     dialogCount: 6, // Actualizado con más diálogos
     dialogs: [
       {
         character: "Recepcionista",
         text: "Good afternoon. How may I help you?",
         options: [
           { id: "opt1", text: "I have a reservation.", isCorrect: true },
           { id: "opt2", text: "I want a room.", isCorrect: false },
           { id: "opt3", text: "Give me a room.", isCorrect: false },
         ],
         explanation:
           "La opción más apropiada es 'I have a reservation', que es educada y directa. Las otras opciones suenan demasiado exigentes o informales para este contexto.",
         audioUrl: "/audio/hotel/dialog1.mp3",
         points: 10,
       },
       {
         character: "Recepcionista",
         text: "What time would you like housekeeping to clean your room?",
         correctAnswer: "Around 10 AM would be perfect",
         explanation:
           "Una buena respuesta especifica la hora y usa una expresión como 'would be perfect' para ser educado. También puedes usar 'would be great' o 'would be fine'.",
         audioUrl: "/audio/hotel/dialog2.mp3",
         points: 15,
       },
       {
         character: "Recepcionista",
         text: "Is there anything else you need?",
         options: [
           { id: "opt1", text: "No, that's all. Thank you.", isCorrect: true },
           { id: "opt2", text: "No.", isCorrect: false },
           { id: "opt3", text: "Nothing more.", isCorrect: false },
         ],
         explanation:
           "La respuesta más educada y completa es 'No, that's all. Thank you.' Incluye un agradecimiento, lo cual es importante en conversaciones de servicio al cliente.",
         audioUrl: "/audio/hotel/dialog3.mp3",
         points: 10,
       },
       // Nuevos diálogos
       {
         character: "Recepcionista",
         text: "Would you like a room with a view?",
         correctAnswer: "Yes, I'd prefer a room with a view if possible",
         explanation:
           "Una respuesta educada usa 'I'd prefer' (contracción de 'I would prefer') y añade 'if possible' para ser cortés y no sonar demasiado exigente.",
         audioUrl: "/audio/hotel/dialog4.mp3",
         points: 15,
       },
       {
         character: "Servicio de habitaciones",
         text: "Room service. May I take your order?",
         options: [
           { id: "opt1", text: "I'd like to order a club sandwich and a soda, please.", isCorrect: true },
           { id: "opt2", text: "Bring me a sandwich.", isCorrect: false },
           { id: "opt3", text: "One sandwich and soda.", isCorrect: false },
         ],
         explanation:
           "La respuesta más completa y educada es 'I'd like to order a club sandwich and a soda, please'. Usa 'I'd like' y especifica claramente lo que quieres ordenar.",
         audioUrl: "/audio/hotel/dialog5.mp3",
         points: 15,
       },
       {
         character: "Recepcionista",
         text: "How will you be paying for your stay?",
         correctAnswer: "I'll be paying with my credit card",
         explanation:
           "Una buena respuesta usa el futuro continuo 'I'll be paying' seguido del método de pago. Es formal y claro.",
         audioUrl: "/audio/hotel/dialog6.mp3",
         points: 15,
       },
     ],
   },
   {
     id: "store",
     title: "Tienda",
     description: "Aprende a comprar en una tienda",
     difficulty: "Principiante",
     dialogCount: 6, // Actualizado con más diálogos
     dialogs: [
       {
         character: "Vendedor",
         text: "Hi there! Can I help you find anything today?",
         options: [
           { id: "opt1", text: "No, I'm just looking.", isCorrect: true },
           { id: "opt2", text: "No, I look.", isCorrect: false },
           { id: "opt3", text: "I only see.", isCorrect: false },
         ],
         explanation:
           "La expresión correcta es 'I'm just looking', que es una frase común en inglés para indicar que solo estás mirando y no necesitas ayuda en ese momento.",
         audioUrl: "/audio/store/dialog1.mp3",
         points: 10,
       },
       {
         character: "Vendedor",
         text: "Would you like to try this on?",
         correctAnswer: "Yes, where are the fitting rooms",
         explanation:
           "Una buena respuesta acepta la oferta y hace una pregunta relevante. Preguntar por los probadores es natural en este contexto.",
         audioUrl: "/audio/store/dialog2.mp3",
         points: 15,
       },
       {
         character: "Cajero",
         text: "Would you like to pay with cash or card?",
         options: [
           { id: "opt1", text: "With card.", isCorrect: false },
           { id: "opt2", text: "I'll pay with card, please.", isCorrect: true },
           { id: "opt3", text: "Card.", isCorrect: false },
         ],
         explanation:
           "La respuesta más completa y educada es 'I'll pay with card, please'. Incluye un verbo completo y 'please' para ser cortés.",
         audioUrl: "/audio/store/dialog3.mp3",
         points: 10,
       },
       // Nuevos diálogos
       {
         character: "Vendedor",
         text: "Do you need a different size?",
         correctAnswer: "Yes, do you have this in medium",
         explanation:
           "Una buena respuesta responde a la pregunta y hace una pregunta de seguimiento específica sobre la talla que necesitas.",
         audioUrl: "/audio/store/dialog4.mp3",
         points: 15,
       },
       {
         character: "Vendedor",
         text: "Would you like a gift receipt?",
         options: [
           { id: "opt1", text: "Yes, please.", isCorrect: true },
           { id: "opt2", text: "Yes.", isCorrect: false },
           { id: "opt3", text: "Give receipt.", isCorrect: false },
         ],
         explanation:
           "La respuesta más educada es 'Yes, please'. Es corta pero incluye 'please', lo que la hace educada y apropiada.",
         audioUrl: "/audio/store/dialog5.mp3",
         points: 5,
       },
       {
         character: "Vendedor",
         text: "Are you looking for anything specific today?",
         correctAnswer: "Yes, I'm looking for a winter coat",
         explanation:
           "Una buena respuesta es específica sobre lo que estás buscando. Usar 'I'm looking for' es la forma correcta de expresar lo que quieres encontrar.",
         audioUrl: "/audio/store/dialog6.mp3",
         points: 10,
       },
     ],
   },
   {
     id: "interview",
     title: "Entrevista de trabajo",
     description: "Practica para una entrevista de trabajo en inglés",
     difficulty: "Avanzado", // Cambiado a Avanzado
     dialogCount: 7, // Actualizado con más diálogos
     dialogs: [
       {
         character: "Entrevistador",
         text: "Tell me a little bit about yourself.",
         correctAnswer: "I have five years of experience in marketing",
         explanation:
           "Esta es solo una respuesta de ejemplo. En una entrevista real, deberías hablar sobre tu experiencia, educación y habilidades relevantes para el puesto. La respuesta debe ser concisa pero informativa.",
         audioUrl: "/audio/interview/dialog1.mp3",
         points: 20,
       },
       {
         character: "Entrevistador",
         text: "What are your strengths?",
         options: [
           { id: "opt1", text: "I am good at everything.", isCorrect: false },
           { id: "opt2", text: "I'm very organized and I pay attention to detail.", isCorrect: true },
           { id: "opt3", text: "I don't have weaknesses.", isCorrect: false },
         ],
         explanation:
           "La segunda opción es la mejor porque menciona fortalezas específicas y relevantes. Evita respuestas exageradas como 'good at everything' o respuestas que no responden a la pregunta.",
         audioUrl: "/audio/interview/dialog2.mp3",
         points: 15,
       },
       {
         character: "Entrevistador",
         text: "Why do you want to work for our company?",
         correctAnswer: "I admire your company's innovative approach",
         explanation:
           "Una buena respuesta muestra que has investigado la empresa y tienes razones específicas para querer trabajar allí. Mencionar aspectos como la cultura, los valores o los productos de la empresa demuestra interés genuino.",
         audioUrl: "/audio/interview/dialog3.mp3",
         points: 20,
       },
       {
         character: "Entrevistador",
         text: "Do you have any questions for me?",
         options: [
           { id: "opt1", text: "No, I don't have any questions.", isCorrect: false },
           { id: "opt2", text: "Yes, could you tell me more about the team I would be working with?", isCorrect: true },
           { id: "opt3", text: "When do I start?", isCorrect: false },
         ],
         explanation:
           "Siempre es bueno tener preguntas preparadas para el entrevistador. Muestra interés en el puesto y la empresa. Preguntar sobre el equipo, la cultura o las expectativas del rol son buenas opciones.",
         audioUrl: "/audio/interview/dialog4.mp3",
         points: 15,
       },
       // Nuevos diálogos
       {
         character: "Entrevistador",
         text: "Where do you see yourself in five years?",
         correctAnswer: "I hope to have grown in my role and taken on more responsibilities",
         explanation:
           "Una buena respuesta muestra ambición pero realismo. Hablar de crecimiento profesional y mayores responsabilidades demuestra compromiso a largo plazo sin ser demasiado específico.",
         audioUrl: "/audio/interview/dialog5.mp3",
         points: 25,
       },
       {
         character: "Entrevistador",
         text: "Tell me about a time when you had to deal with a difficult situation at work.",
         options: [
           { id: "opt1", text: "I've never had difficult situations.", isCorrect: false },
           {
             id: "opt2",
             text: "In my previous job, we had a tight deadline for an important project. I organized the team, prioritized tasks, and we delivered on time.",
             isCorrect: true,
           },
           { id: "opt3", text: "I quit my job when it got difficult.", isCorrect: false },
         ],
         explanation:
           "La segunda opción es la mejor porque describe una situación específica, explica cómo la manejaste y el resultado positivo. Usar el método STAR (Situación, Tarea, Acción, Resultado) es efectivo para este tipo de preguntas.",
         audioUrl: "/audio/interview/dialog6.mp3",
         points: 25,
       },
       {
         character: "Entrevistador",
         text: "What salary are you expecting?",
         correctAnswer:
           "Based on my experience and the industry standards, I'm looking for a salary in the range of $X to $Y",
         explanation:
           "Una buena respuesta muestra que has investigado los salarios del sector y tienes expectativas realistas basadas en tu experiencia. Es mejor dar un rango que una cifra específica.",
         audioUrl: "/audio/interview/dialog7.mp3",
         points: 20,
       },
     ],
   },
   // Nuevo escenario
   {
     id: "doctor",
     title: "Consulta médica",
     description: "Aprende a comunicarte con un médico en inglés",
     difficulty: "Intermedio",
     dialogCount: 5,
     dialogs: [
       {
         character: "Doctor",
         text: "What seems to be the problem today?",
         options: [
           { id: "opt1", text: "I have a headache and a fever since yesterday.", isCorrect: true },
           { id: "opt2", text: "Head hurts. Fever.", isCorrect: false },
           { id: "opt3", text: "I'm sick.", isCorrect: false },
         ],
         explanation:
           "La primera opción es la mejor porque describe los síntomas específicos y menciona cuándo comenzaron. Esto proporciona información importante para el diagnóstico.",
         audioUrl: "/audio/doctor/dialog1.mp3",
         points: 15,
       },
       {
         character: "Doctor",
         text: "How long have you been feeling this way?",
         correctAnswer: "I've been feeling sick since yesterday morning",
         explanation:
           "Una buena respuesta usa el presente perfecto continuo ('I've been feeling') para describir una acción que comenzó en el pasado y continúa en el presente, y especifica cuándo comenzaron los síntomas.",
         audioUrl: "/audio/doctor/dialog2.mp3",
         points: 20,
       },
       {
         character: "Doctor",
         text: "Are you allergic to any medications?",
         options: [
           { id: "opt1", text: "No, I don't have any allergies that I know of.", isCorrect: true },
           { id: "opt2", text: "No allergies.", isCorrect: false },
           { id: "opt3", text: "I don't think so.", isCorrect: false },
         ],
         explanation:
           "La primera opción es la más completa y clara. Es importante ser específico sobre alergias médicas, y la frase 'that I know of' indica que estás siendo honesto sobre tu conocimiento.",
         audioUrl: "/audio/doctor/dialog3.mp3",
         points: 15,
       },
       {
         character: "Doctor",
         text: "I'm going to prescribe some antibiotics. Take one pill twice a day with food.",
         correctAnswer: "How long should I take them for",
         explanation:
           "Una buena pregunta de seguimiento es sobre la duración del tratamiento. Es importante saber cuánto tiempo debes tomar los medicamentos recetados.",
         audioUrl: "/audio/doctor/dialog4.mp3",
         points: 20,
       },
       {
         character: "Doctor",
         text: "Do you have any questions about your treatment?",
         options: [
           { id: "opt1", text: "No, I understand everything. Thank you, doctor.", isCorrect: true },
           { id: "opt2", text: "No questions.", isCorrect: false },
           { id: "opt3", text: "It's fine.", isCorrect: false },
         ],
         explanation:
           "La primera opción es la más educada y completa. Confirma que has entendido las instrucciones y agradeces al médico, lo cual es apropiado en este contexto.",
         audioUrl: "/audio/doctor/dialog5.mp3",
         points: 15,
       },
     ],
   },
 ]
 
 // Añadir función para filtrar escenarios por dificultad
 export function getScenariosByDifficulty(difficulty: "Principiante" | "Intermedio" | "Avanzado" | "Todos"): Scenario[] {
   if (difficulty === "Todos") {
     return scenarios
   }
   return scenarios.filter((scenario) => scenario.difficulty === difficulty)
 }
 
 export function getScenarioData(id: string): Scenario | undefined {
   return scenarios.find((scenario) => scenario.id === id)
 }
 