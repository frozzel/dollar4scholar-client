import AuthProvider from "./AuthProvider.jsx";
import NotificationProvider from "./NotificationProvider.jsx";


export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
          <AuthProvider>
          
            {children}
        
          </AuthProvider>
    </NotificationProvider>
  );
}