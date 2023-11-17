export function useException() {
  const handleException = (errCode) => {
    switch (errCode) {
    case 'auth/invalid-email':
      return 'E-mail inválido.';

    case 'auth/email-already-in-use':
      return 'Este e-mail já foi utilizado por outro usuário.';

    case 'auth/user-not-found':
      return 'Nenhuma conta encontrada para este e-mail.';

    case 'auth/too-many-requests':
      return 'Conta bloqueada por excesso de tentativas.';

    case 'auth/wrong-password':
      return 'Senha incorreta.';

    case 'auth/weak-password':
      return 'Sua senha deve possuir no mínimo 6 caracteres.';

    case 'auth/user-disabled':
      return 'Conta inativa.';

    case 'auth/internal-error':
      return 'Erro interno. Contate o administrador do sistema.';
    
    default:
      return 'E-mail ou senha incorreta.';
    }
  };

  return {
    handleException
  };
}