// Este código desactiva cualquier service worker registrado

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
            registration.unregister();
        });
    });
}
