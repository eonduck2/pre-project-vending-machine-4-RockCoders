/**
 * @crystal23733 24.07.13
 * * 서버측으로 삭제 데이터 POST요청보내는 함수
 */

export default async (event: Event) => {
  event.preventDefault();
  const deleteForm = event.target as HTMLFormElement;
  const formData = new FormData(deleteForm);
  const id = formData.get('id') as string;

  try {
    const response = await fetch('/admin/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();
    const deleteErrorElement = document.getElementById('delete-error') as HTMLElement;

    if (response.ok) {
      // 성공적인 응답인 경우
      deleteErrorElement.classList.add('hidden');
      window.location.href = '/admin';
    } else {
      // 에러 응답인 경우
      deleteErrorElement.textContent = result.error || '서버 오류가 발생했습니다.';
      deleteErrorElement.classList.remove('hidden');
    }
  } catch (error) {
    console.error('오류 발생:', error);
    const deleteErrorElement = document.getElementById('delete-error') as HTMLElement;
    deleteErrorElement.textContent = '서버와의 통신 중 오류가 발생했습니다.';
    deleteErrorElement.classList.remove('hidden');
  }
};