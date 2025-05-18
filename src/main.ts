// main.ts
import {
  bootstrapApplication,
  provideNativeScriptHttpClient,
  provideNativeScriptNgZone,
  provideNativeScriptRouter,
  runNativeScriptAngularApp,
  AppLaunchView,
  NgModuleReason,
} from '@nativescript/angular';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { Image, Label, Color, StackLayout } from '@nativescript/core';

/**
 * Disable zone by setting this to true
 * Then also adjust polyfills.ts (see note there)
 */
const EXPERIMENTAL_ZONELESS = false;

class CustomLaunchView extends StackLayout implements AppLaunchView {
  complete: (reason?: any) => void;
  constructor() {
    super();
    console.log('CustomLaunchView constructor called'); // Verifica que se llame
    this.backgroundColor = new Color('#f0f0f0'); // Asegúrate de que el color sea visible

    const logo = new Image();
    logo.src = '~/assets/images/app-icon.png';
    logo.width = 100;
    logo.height = 100;
    logo.horizontalAlignment = 'center';

    const titleLabel = new Label();
    titleLabel.text = 'Práctica Profesional';
    titleLabel.fontSize = 18;
    titleLabel.color = new Color('#063215');
    titleLabel.horizontalAlignment = 'center';
    titleLabel.marginTop = 20;

    const nameLabel = new Label();
    nameLabel.text = 'Leonel Alegre';
    nameLabel.fontSize = 16;
    nameLabel.color = new Color('#777');
    nameLabel.horizontalAlignment = 'center';
    nameLabel.marginTop = 10;

    this.addChild(titleLabel);
    this.addChild(logo);
    this.addChild(nameLabel);
    this.verticalAlignment = 'middle';
  }

  startAnimation(): void {
    console.log('CustomLaunchView animation started'); // Verifica que se llame
    // No necesitamos animación compleja por ahora
  }

  cleanup(): Promise<any> {
    console.log('CustomLaunchView cleanup called'); // Verifica que se llame
    return new Promise((resolve) => {
      this.complete = resolve;
      this.fadeOut();
    });
  }

  async fadeOut() {
    console.log('CustomLaunchView fadeOut called'); // Verifica que se llame
    await this.animate({
      opacity: 0,
      duration: 400,
    });
    this.complete();
  }
}

runNativeScriptAngularApp({
  appModuleBootstrap: () => {
    console.log('Bootstrap application'); // Agrega este log para verificar
    return bootstrapApplication(AppComponent, {
      providers: [
        provideNativeScriptHttpClient(withInterceptorsFromDi()),
        provideNativeScriptRouter(routes),
        EXPERIMENTAL_ZONELESS
          ? provideExperimentalZonelessChangeDetection()
          : provideNativeScriptNgZone(),
      ],
    });
  },
  launchView: (reason: NgModuleReason) => {
    const launchView = new CustomLaunchView();
    launchView.startAnimation(); // Forzar la ejecución de la animación
    return launchView;
  },
});