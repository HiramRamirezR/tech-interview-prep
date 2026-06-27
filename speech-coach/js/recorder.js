const Recorder = {
  recognition: null,
  isRecording: false,
  onTranscript: null,
  onStateChange: null,

  init() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Web Speech API no soportada en este navegador');
      return false;
    }
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      if (this.onTranscript) this.onTranscript(final, interim);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.stop();
    };

    this.recognition.onend = () => {
      if (this.isRecording) {
        this.recognition.start();
      }
    };

    return true;
  },

  start() {
    if (!this.recognition) {
      if (!this.init()) return;
    }
    this.isRecording = true;
    this.recognition.start();
    if (this.onStateChange) this.onStateChange(true);
  },

  stop() {
    if (!this.recognition) return;
    this.isRecording = false;
    this.recognition.stop();
    if (this.onStateChange) this.onStateChange(false);
  },

  toggle() {
    if (this.isRecording) this.stop();
    else this.start();
  }
};
