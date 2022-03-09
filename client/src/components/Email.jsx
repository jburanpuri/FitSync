import React from 'react';

export default function () {
    return (
        <section>
            <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            />
            <br></br>
            <br></br>
            <div class="container">
                <h2 class="text-center">
                    Apply for Verification
                </h2>
                <form action="/sendemail" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <input class="form-control" type="email" name="to" required placeholder="To:" value="fitsyncsupp@gmail.com"/>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="subject" placeholder="Subject:" required id="" />
                    </div>
                    <div class="form-group">
                        <textarea required class="form-control" name="body" id="" cols="30" rows="10" placeholder="Body:"></textarea>
                    </div>
                    <label for="attachment">Attachment:</label>
                    <div class="form-group">
                        <input type="file" required class="form-control" name="image" id="" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-block btn-danger">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}