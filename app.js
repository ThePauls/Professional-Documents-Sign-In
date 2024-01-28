const scriptURL = 'https://script.google.com/macros/s/AKfycbzbEZSEARSZNsV6mIihKO5t6Ld9Jo9DTpEqigFWQbms_HptG4pVKrzRk8w48pmV5s4s3g/exec';
const form = document.forms['submit-to-google-sheet'];

const passwordRedirectMap = {
    'pass': './redirect1.html',
    'pass2': './redirect2.html',
    'password3': './redirect3.html',
    // Add more mappings as needed
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Prompt for password
    const { value: password } = await Swal.fire({
        title: 'Enter Password',
        input: 'password',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Password is required!';
            } else {
                // Check if the entered password is in the passwordRedirectMap
                if (!passwordRedirectMap.hasOwnProperty(value)) {
                    Swal.fire({
                        title: 'Incorrect Password',
                        text: 'Please enter a valid password.',
                        icon: 'warning',
                    });
                    return ''; // Reject the input
                }
            }
        },
    });

    if (password) {
        Swal.fire({
            title: 'Submitting...',
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
                        title: 'Success!',
                        text: 'Submission Successful!',
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
