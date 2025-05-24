export function generateId(prefix = 'id_') {
    return prefix + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}