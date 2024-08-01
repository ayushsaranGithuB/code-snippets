const CreatePage = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = document.getElementById('create-form');
        const formData = new FormData(form);
        const data = {
            title: formData.get('title'),
            snippet: formData.get('snippet'),
            tags: formData.get('tags')
        };

        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            form.reset();
            alert('Snippet added successfully');
            console.log(data);
        } else {
            console.error('Error:', response.statusText);
        }


    }

    return (<>
        <div className="input-form">
            <form name="create-form" id="create-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" required />
                <label htmlFor="code">Code Snippet</label>
                <textarea name="snippet" id="code" required cols="40" rows="10"></textarea>
                <label htmlFor="tags">Tags</label>
                <input type="text" name="tags" id="tags" required />
                <button type="submit">Add Snippet</button>
            </form>
        </div>
    </>);
}

export default CreatePage;