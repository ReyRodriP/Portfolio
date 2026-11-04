import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modal } from './modal';

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;
  let previousMonochromeAttribute: string | null;

  beforeEach(async () => {
    previousMonochromeAttribute = document.documentElement.getAttribute('data-monochrome');
    await TestBed.configureTestingModule({
      imports: [Modal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', {
      title: 'Proyecto de ejemplo',
      description: 'Vista previa del proyecto',
      images: [{
        src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/%3E',
        alt: 'Captura del proyecto',
      }],
    });
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    if (previousMonochromeAttribute === null) {
      document.documentElement.removeAttribute('data-monochrome');
    } else {
      document.documentElement.setAttribute('data-monochrome', previousMonochromeAttribute);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies the selected color mode even while the gallery is in the browser top layer', () => {
    const dialog: HTMLDialogElement = fixture.nativeElement.querySelector('dialog');
    expect(dialog.matches(':modal')).toBeTrue();
    expect(dialog.querySelector('img')).not.toBeNull();

    document.documentElement.setAttribute('data-monochrome', 'on');
    expect(getComputedStyle(dialog).filter).toBe('grayscale(1)');

    document.documentElement.setAttribute('data-monochrome', 'off');
    expect(getComputedStyle(dialog).filter).toBe('grayscale(0)');
  });
});
