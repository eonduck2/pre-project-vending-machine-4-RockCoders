/**
 * @crystal23733 24.07.13
 * * 서버측으로 업데이트 데이터 POST요청보내는 함수
 */

export default async (event: Event) => {
  event.preventDefault();
  const updateForm = event.target as HTMLFormElement;
  const formData = new FormData(updateForm);
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  try {
    const response = await fetch('/admin/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, price }),
    });

    const result = await response.json();
    const updateErrorElement = document.getElementById('update-error') as HTMLElement;

    if (response.ok) {
      // 성공적인 응답인 경우
      updateErrorElement.classList.add('hidden');
      window.location.href = '/admin';
    } else {
      // 에러 응답인 경우
      updateErrorElement.textContent = result.error || '서버 오류가 발생했습니다.';
      updateErrorElement.classList.remove('hidden');
    }
  } catch (error) {
    console.error('오류 발생:', error);
    const updateErrorElement = document.getElementById('update-error') as HTMLElement;
    updateErrorElement.textContent = '서버와의 통신 중 오류가 발생했습니다.';
    updateErrorElement.classList.remove('hidden');
  }
};