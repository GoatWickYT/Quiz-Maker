import 'dotenv/config';

function requireEnv(name: string): string {
    const value: string | undefined = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
}

const config = {
    port: Number(requireEnv('PORT')),
    mongoUri: requireEnv('DB_URI'),
};

export default config;
