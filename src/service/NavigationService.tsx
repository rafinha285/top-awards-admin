// src/services/NavigationService.ts
export class NavigationService {
    private static navigator: ((path: string) => void) | undefined;

    // O App chama isso para "ligar" a navegação
    public static setNavigator(nav: (path: string) => void) {
        this.navigator = nav;
    }

    // Suas classes chamam isso para mudar de página
    public static go(path: string) {
        if (this.navigator) {
            this.navigator(path);
        } else {
            console.error("Navegação não inicializada!");
            window.location.href = path; // Fallback de emergência
        }
    }
}