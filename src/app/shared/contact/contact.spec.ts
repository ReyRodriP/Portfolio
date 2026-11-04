import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contact } from './contact';

describe('Contact', () => {
  let component: Contact;
  let fixture: ComponentFixture<Contact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Contact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('copies the address and announces success when the clipboard is available', async () => {
    const writeText = spyOn(navigator.clipboard, 'writeText')
      .and.returnValue(Promise.resolve());

    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith(component.email);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent)
      .toContain('Correo copiado');
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalse();
  });

  it('offers manual copying when the browser refuses clipboard access', async () => {
    spyOn(navigator.clipboard, 'writeText')
      .and.returnValue(Promise.reject(new DOMException('Access denied', 'NotAllowedError')));

    fixture.nativeElement.querySelector('button').click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]').textContent)
      .toContain('copiarla manualmente');
    expect(fixture.nativeElement.querySelector('.email-address').textContent)
      .toContain(component.email);
    expect(fixture.nativeElement.querySelector('button').disabled).toBeFalse();
  });
});
