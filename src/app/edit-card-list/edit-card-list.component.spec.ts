import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardListComponent } from './edit-card-list.component';

describe('EditCardListComponent', () => {
  let component: EditCardListComponent;
  let fixture: ComponentFixture<EditCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
