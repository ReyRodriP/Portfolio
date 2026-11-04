import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  readonly email = 'reynaldorodriguez802@gmail.com';
  readonly emailLink = `mailto:${this.email}?subject=${encodeURIComponent('Contacto desde tu portafolio')}`;
  readonly copying = signal(false);
  readonly copyMessage = signal('');

  private readonly document = inject(DOCUMENT);

  async copyEmail(): Promise<void> {
    if (this.copying()) return;

    const clipboard = this.document.defaultView?.navigator.clipboard;

    if (!clipboard) {
      this.copyMessage.set('Puedes seleccionar y copiar la dirección que aparece arriba.');
      return;
    }

    this.copying.set(true);
    this.copyMessage.set('');

    try {
      await clipboard.writeText(this.email);
      this.copyMessage.set('Correo copiado. Puedes pegarlo en tu aplicación de correo.');
    } catch {
      this.copyMessage.set('No se pudo copiar. Puedes seleccionar la dirección y copiarla manualmente.');
    } finally {
      this.copying.set(false);
    }
  }
}
