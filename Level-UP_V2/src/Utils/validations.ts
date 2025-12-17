export const validateRut = (rut: string): boolean => {
    if (!rut) return false;
    
    let valor = rut.replace(/\./g, "").replace(/-/g, "");
    
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1).toUpperCase();
    
    if (cuerpo.length < 7) return false;
    
    let suma = 0;
    let multiplicalo = 2;
    
    for (let i = 1; i <= cuerpo.length; i++) {
        let index = multiplicalo * parseInt(valor.charAt(valor.length - 1 - i));
        suma = suma + index;
        if (multiplicalo < 7) { multiplicalo = multiplicalo + 1; } else { multiplicalo = 2; }
    }
    
    let dvEsperado = 11 - (suma % 11);
    let dvCalculado = "";
    
    if (dvEsperado === 11) dvCalculado = "0";
    else if (dvEsperado === 10) dvCalculado = "K";
    else dvCalculado = dvEsperado.toString();
    
    return dvCalculado === dv;
};

export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(email);
};

export const validatePassword = (pass: string): boolean => {
    return pass.length >= 4 && pass.length <= 10;
};