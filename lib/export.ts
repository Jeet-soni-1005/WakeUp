import { exportStillData } from './storage';

if (typeof window !== 'undefined') {
  (window as any).__exportStillData = () => {
    const data = exportStillData();
    console.log('STILL Data Export:');
    console.log(data);
    return data;
  };
}
