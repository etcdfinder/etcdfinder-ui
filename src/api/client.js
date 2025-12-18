export const searchKeys = async (searchStr) => {
    const response = await fetch('/v1/search-keys', {
        method: 'POST', // Using POST as browsers don't support GET with body
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search_str: searchStr }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch keys');
    }

    return response.json();
};

export const getKey = async (key) => {
    const response = await fetch('/v1/get-key', {
        method: 'POST', // Using POST as browsers don't support GET with body
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch key value');
    }

    return response.json();
};

export const putKey = async (key, value) => {
    const response = await fetch('/v1/put-key', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, value }),
    });

    if (!response.ok) {
        throw new Error('Failed to update key value');
    }

    return response.json();
};

export const deleteKey = async (key) => {
    const response = await fetch('/v1/delete-key', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
    });

    if (!response.ok) {
        throw new Error('Failed to delete key');
    }

    return response.json();
};
