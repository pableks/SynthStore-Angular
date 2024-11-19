/**
 * Configuración del entorno para la aplicación.
 */
export const environment = {
    /**
     * Indica si la aplicación está en producción.
     * @type {boolean}
     */
    production: false,

    /**
     * Configuración de Firebase para la integración con la aplicación.
     * Contiene las credenciales y configuraciones necesarias para Firebase.
     * @type {{ 
     *   apiKey: string,
     *   authDomain: string,
     *   projectId: string,
     *   storageBucket: string,
     *   messagingSenderId: string,
     *   appId: string,
     *   measurementId: string
     * }}
     */
    firebase: {
        apiKey: "AIzaSyDNfW0w-d7djMDklJMyfifVFoWJSoSGh14",
        authDomain: "test-sales-c4671.firebaseapp.com",
        projectId: "test-sales-c4671",
        storageBucket: "test-sales-c4671.appspot.com",
        messagingSenderId: "13063947949",
        appId: "1:13063947949:web:ff1929126f5556f0cee824",
        measurementId: "G-7FZ32P2605"
    }
};
