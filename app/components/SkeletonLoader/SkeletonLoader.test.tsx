import React from 'react';
import { render } from '@testing-library/react';
import SkeletonLoader from './SkeletonLoader';

describe('SkeletonLoader', () => {
  it('renders without crashing', () => {
    const { container } = render(<SkeletonLoader />);
    expect(container).toBeInTheDocument();
  });

  it('contains the expected number of skeleton elements in the header', () => {
    const { container } = render(<SkeletonLoader />);
    const headerSkeletonElements = container.querySelectorAll('header .animate-pulse');
    // 8 skeleton elements expected in header
    expect(headerSkeletonElements.length).toBe(8);
  });


  it('contains skeleton elements with the expected classes and styles', () => {
    const { container } = render(<SkeletonLoader />);
    const skeletonElements = container.querySelectorAll('.animate-pulse');

    skeletonElements.forEach(element => {
      expect(element).toHaveClass('bg-slate-800');
      expect(element).toHaveClass('p-4');
      expect(element).toHaveClass('rounded');
      expect(element).toHaveClass('shadow-md');
    });
  });

  it('renders the correct structure inside each skeleton element in the header', () => {
    const { container } = render(<SkeletonLoader />);
    const headerSkeletonElements = container.querySelectorAll('header .animate-pulse');

    headerSkeletonElements.forEach(element => {
      const innerDiv = element.querySelector('.h-4.bg-gray-500.rounded.mb-4');
      expect(innerDiv).toBeInTheDocument();
    });
  });
});
