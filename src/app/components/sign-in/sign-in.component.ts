import { Component, ComponentRef, inject, NO_ERRORS_SCHEMA, ViewChild, ViewContainerRef } from '@angular/core';
import { Page } from '@nativescript/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationPopupComponent } from '../../components/notification-popup/notification-popup.component';
import { INotification } from '../../interfaces/i-notification';
import { UserService } from '../../services/user.service';
import { NativeScriptCommonModule, NativeScriptFormsModule } from "@nativescript/angular";

@Component({
    selector: 'ns-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css'],
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
    ],
    schemas: [NO_ERRORS_SCHEMA],

})
export class SignInComponent {
    private userService = inject(UserService);

    // Sistema de notificaciones
    @ViewChild('notificationPopup', { read: ViewContainerRef }) notificationPopupRef: ViewContainerRef;
    private notificationPopupCR: ComponentRef<NotificationPopupComponent> | null = null;
    // Propiedades del formulario
    public email = '';
    protected password = '';
    // Validaciones de los campos
    public emailControl = new FormControl('', [Validators.required, Validators.email]);
    public passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    // Estado del modal
    public isModalVisible = false;

    constructor(private page: Page) {
        this.page.actionBarHidden = true; // Ocultar la barra de acción
    }

    ngAfterViewInit(): void {
        // Crear el componente de notificaciones
        this.notificationPopupCR = this.notificationPopupRef.createComponent(NotificationPopupComponent);
    }

    async signIn() {
        if (!this.emailControl.valid)  {
            const notification: INotification = {
                message: 'El correo electrónico no es válido.',
                type: 'error',
            };
            this.notificationPopupCR.instance.pushNotification(notification);
            return;
        }
        if (!this.passwordControl.valid) {
            const notification: INotification = {
                message: 'La contraseña no es válida.',
                type: 'error',
            };
            this.notificationPopupCR.instance.pushNotification(notification);
            return;
        }

        try{
            const notification: INotification = {
                message: 'Autenticando usuario: ' + this.email,
                type: 'success',
            }
            this.notificationPopupCR.instance.pushNotification(notification);
            
            // TODO: getUsers throw error
            this.userService.getUsers();
        }
        catch (error) {
            // Manejo de errores
            const notification: INotification = {
                message: 'Error al autenticar el usuario',
                type: 'error',
            };
            this.notificationPopupCR.instance.pushNotification(notification);
            console.log('Error al iniciar sesión:', error);
        }

    }

    switchModalState() {
        this.isModalVisible = !this.isModalVisible;
    }

    useDemoAccount(type: string) {
        switch (type) {
            case 'usuario':
                this.email = "usuario@usuario.com";
                this.password = "333333";

                console.log("Usuario demo: " + this.email);
                break;
            case 'admin':
                this.email = "admin@admin.com";
                this.password = "111111";
                break;
            case 'invitado':
                this.email = "invitado@invitado.com";
                this.password = "222222";
                break;
            case 'anonimo':
                this.email = "anonimo@anonimo.com"
                this.password = "444444";
                break;
            case 'tester':
                this.email = "tester@tester.com"
                this.password = "555555";
                break;
        }
        this.isModalVisible = false;
    }

    // Previene la interaccion con el fondo
    dummyTouch(){}
}