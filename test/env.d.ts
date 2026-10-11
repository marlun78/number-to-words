// Vite imports a file's contents as a string with the ?raw suffix
declare module '*?raw' {
    const content: string;
    export default content;
}
