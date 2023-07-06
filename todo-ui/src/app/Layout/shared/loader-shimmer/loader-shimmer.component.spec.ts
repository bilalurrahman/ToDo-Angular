import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderShimmerComponent } from './loader-shimmer.component';

describe('LoaderShimmerComponent', () => {
  let component: LoaderShimmerComponent;
  let fixture: ComponentFixture<LoaderShimmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderShimmerComponent]
    });
    fixture = TestBed.createComponent(LoaderShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
