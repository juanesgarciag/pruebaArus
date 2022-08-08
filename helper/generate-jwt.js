import { SignJWT } from 'jose';

const generateJWT = async (uid = '') => {
    try {
        const jwtConstructor = new SignJWT({ uid });
        const encoder = new TextEncoder();

        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime('2h')
            .sign(encoder.encode(process.env.SIGNKEY));

        return(jwt);

    } catch (error) {
        if(error){
            console.log(error);
            return ('No se pudo generar el token');
        }
    }
}

export { generateJWT };