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

  it('should render the quick-sale-first headline', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('MooPing Reward');
    expect(compiled.textContent).toContain('ขายเร็ว');
  });

  it('should let a walk-in customer earn and claim a reward without LINE', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const clickButton = (label: string) => {
      const button = Array.from(compiled.querySelectorAll('button')).find((item) =>
        item.textContent?.includes(label),
      );
      expect(button).toBeTruthy();
      button?.click();
      fixture.detectChanges();
    };

    expect(compiled.textContent).toContain('ลูกค้าทั่วไป ไม่ต้องค้นหา');

    clickButton('+10 ไม้');
    expect(compiled.textContent).toContain('Reward ใหม่');
    expect(compiled.textContent).toContain('บิลนี้ได้ของแถม 1 สิทธิ์');

    clickButton('ยืนยันขาย');
    await fixture.whenStable();
    expect(compiled.textContent).toContain('เลือกของแถมได้ 1 สิทธิ์');

    clickButton('น้ำเปล่า');
    await fixture.whenStable();
    expect(compiled.textContent).toContain('ยังไม่มี reward ที่รอเลือก');
  });

  it('should keep member accumulation and undo separate from quick sale', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const clickButton = (label: string) => {
      const button = Array.from(compiled.querySelectorAll('button')).find((item) =>
        item.textContent?.includes(label),
      );
      expect(button).toBeTruthy();
      button?.click();
      fixture.detectChanges();
    };

    clickButton('สมาชิก LINE');
    expect(compiled.textContent).toContain('คุณเอ');

    clickButton('+5 ไม้');
    expect(compiled.textContent).toContain('Reward ใหม่');

    clickButton('ยืนยันขาย');
    await fixture.whenStable();
    expect(compiled.textContent).toContain('2/10');
    expect(compiled.textContent).toContain('Reward รอเลือก');

    clickButton('ยกเลิกรายการล่าสุด');
    await fixture.whenStable();
    expect(compiled.textContent).toContain('7/10');
  });
});
