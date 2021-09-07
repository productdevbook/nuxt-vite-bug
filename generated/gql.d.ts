

declare module '*/login.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const loginMutation: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/logout.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const logout: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/refresh_token.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const refreshToken: DocumentNode;

  export default defaultDocument;
}
    



declare module '*/forgotPasswordByEmail.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const forgotPasswordByEmail: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/resetPassword.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const resetPasswordInput: DocumentNode;

  export default defaultDocument;
}
    


