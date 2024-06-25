// * 제품이 추가되면 실행할 함수 (db create)

const productCreate = document.getElementById('create') as HTMLElement;
const createForm = document.getElementById('create-form') as HTMLElement;
const report = document.getElementById('report') as HTMLElement;

export const create = (): void => {
  productCreate.addEventListener('click', () => {
    createForm.classList.remove('hidden');
    report.classList.add('hidden');
  })
}

export const createSubmit = ():void => {
  createForm.addEventListener('submit', () => {
    createForm.classList.add('hidden');
    report.classList.remove('hidden');
  })
}