const model = {
  english: {
    sessionStarted: {
      expect:[
        [
          "Hello my name is Eva! I can help you with your personal information forwarding.",
          "Hey, I am Eva, how can I help you?",
        ],
      ],
    },
    PersonalNameIntent: {
      expect: [
        [
          "Please, provide your personal name.",
          "What is your personal name?",
        ],
        [
          "Sorry, I am not sure, could you please tell me you name.",
        ],
      ],
      received: [
        "Okay, so your name is {}.",
        "Nice to meet your {}.",
      ],
    },
    PeselNumberIntent: {
      expect: [
        [
          "Please, provide your PESEL number.",
          "What is your PESEL number?",
        ],
        [
          "Sorry, I am not sure, could you please tell me your PESEL number.",
        ],
      ],
      received: [
        "Okay, so your PESEL is {}.",
      ],
    },
    AgeIntent: {
      expect: [
        [
          "Please, provide your age.",
          "What is your age?",
        ],
        [
          "Sorry, I am not sure, could you please tell me your age.",
        ],
      ],
      received: [
        "Okay, so your age is {}.",
      ],
    },
    PhoneNumberIntent: {
      expect: [
        [
          "Please, provide phone number.",
          "What is your phone number?",
        ],
        [
          "Sorry, I am not sure, could you provide your phone number.",
        ],
      ],
      received: [
        "Okay, so your phone number is {}.",
      ],
    },
    close: {
      expect: [
        [
          "Thank you for your time. Is there anything else I can help you?"
        ]
      ]
    }
  },
  german: {
    PeselNumberIntent: {
      expect: [
        [
          "Wie ist Ihr PESEL Nummer?",
          "Welche PESEL Nummer haben Sie?",
        ],
        [
          "Entschuldigung, ich bin nicht sicher. Welche PESEL Nummer hast du?",
        ],
      ],
      received: [
        "Also, deine PESEL Nummer ist {}",
      ],
    },
    AgeIntent: {
      expect: [
        [
          "Wie alt bist du?",
        ],
        [
          "Entschuldigung, ich bin nicht sicher. Wie viel alt bist du?",
        ],
      ],
      received: [
        "Okay, du bist {} Jahre alt.",
      ],
    },
  },
};

export default model;
