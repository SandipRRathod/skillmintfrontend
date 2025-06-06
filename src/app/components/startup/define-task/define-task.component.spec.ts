import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTaskComponent } from './define-task.component';

describe('DefineTaskComponent', () => {
  let component: DefineTaskComponent;
  let fixture: ComponentFixture<DefineTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefineTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefineTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
