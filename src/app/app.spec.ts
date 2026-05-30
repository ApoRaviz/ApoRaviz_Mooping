import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the loyalty headline', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('ระบบสะสมหมูปิ้ง');
  });

  it('should require confirmation before saving a POS sale and allow undo', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = () => Array.from(compiled.querySelectorAll('button'));
    const clickButton = (label: string) => {
      const button = buttons().find((item) => item.textContent?.includes(label));
      expect(button).toBeTruthy();
      button?.click();
      fixture.detectChanges();
    };

    clickButton('+3 ไม้');
    expect(compiled.textContent).toContain('รายการรอยืนยัน');
    expect(compiled.textContent).toContain('3 ไม้');
    expect(compiled.textContent).toContain('7/10');
    expect(compiled.textContent).toContain('Reward รอเลือก0');

    clickButton('ยืนยันบันทึกยอด');
    await fixture.whenStable();
    expect(compiled.textContent).toContain('0/10');
    expect(compiled.textContent).toContain('Reward รอเลือก1');

    clickButton('ยกเลิกรายการล่าสุด');
    await fixture.whenStable();
    expect(compiled.textContent).toContain('7/10');
    expect(compiled.textContent).toContain('Reward รอเลือก0');
  });
});
