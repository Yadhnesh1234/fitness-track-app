import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveuserworkoutComponent } from './saveuserworkout.component';

describe('SaveuserworkoutComponent', () => {
  let component: SaveuserworkoutComponent;
  let fixture: ComponentFixture<SaveuserworkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveuserworkoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveuserworkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
