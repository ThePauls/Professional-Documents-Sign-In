const scriptURL = 'https://script.google.com/macros/s/AKfycbzg7oOjj0KAQzGqgHFO-wKjjOQ6vjLokIxeqHBM0_FSoay3ab3PMPdDJxE2cgtefyQp/exec';
const form = document.forms['submit-to-google-sheet'];

const passwordRedirectMap = {
    'admin': 'https://jamilo-school.github.io/landing-page/',
    'pass2': './redirect2.html',
    'password3': './redirect3.html',
    // Add more mappings as needed
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prompt for password
    const { value: password } = await Swal.fire({
        title: 'Digital Activation License Key Required',
        input: 'password',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Password is required!';
            } else {
                // Check if the entered password is in the passwordRedirectMap
                if (!passwordRedirectMap.hasOwnProperty(value)) {
                    Swal.fire({
                        title: 'Incorrect Activation License Key',
                        text: 'Please enter a valid key or contact.',
                        icon: 'warning',
                    });
                    return ''; // Reject the input
                }
            }
        },
    });

    if (password) {
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then((response) => {
                Swal.close();
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Access Granted!',
                        text: 'welcome!',
                        icon: 'success',
                    });
                    form.reset();
                    setTimeout(() => {
                        Swal.close();
                        window.location.href = passwordRedirectMap[password];
                    }, 2000);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Submission Failed',
                        icon: 'error',
                    });
                }
            })
            .catch((error) => {
                console.error('Error!', error.message);
                Swal.close();
                Swal.fire({
                    title: 'Ooops!!',
                    text: 'Connect to the internet ',
                    icon: 'error',
                });
            });
    }
});
