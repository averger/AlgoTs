import fs from 'fs';

type LsDeepFn = (path: string) => void

export const lsdeep: LsDeepFn = (path: string) => {
    // verification validité du path
    if (!fs.existsSync(path)) {
        // On écrit le message d'erreur en sortie d'erreur
        fs.writeSync(2, 'Error ' + path + ' is not a valid directory\n');
        process.exit(1);
    }

    // file descriptor
    const fd = fs.openSync(path, 'r');
    // Parcourt le contenu du dossier
    let total = 0;
    const entries = fs.readdirSync(path).sort();

    // On écrit le path en sortie standard
    if (path == '.') {
        fs.writeSync(1, path + '/:\n');
    } else {
        fs.writeSync(1, path + ':\n');
    }

    let i = 0;
    // Boucle pour calcul valeur total
    while (i < entries.length) {
        // Récupère les informations de base du fichier ou du dossier
        const stat = fs.statSync(path + '/' + entries[i]);
        total = total + stat.blocks;
        i++;
    }
    // Si le dossier n'est pas vide
    if (entries.length != 0) {
        // On écrit la valeur total en sortie standard
        fs.writeSync(1, 'total ' + total + '\n');
    }

    i = 0;
    // Boucle pour afficher les dossier + fichiers
    while (i < entries.length) {
        // Génère le chemin complet du fichier ou du dossier
        const fullPath = path + '/' + entries[i];
        // Récupère les informations de base du fichier ou du dossier
        const stat = fs.statSync(fullPath);
        // Affiche le type (fichier ou dossier) et le nom du fichier ou du dossier en sortie standard
        if (stat.isDirectory()) {
            fs.writeSync(1, 'Directory  ' + entries[i] + '\n');
        } else if (stat.isFile()) {
            fs.writeSync(1, 'File       ' + entries[i] + '\n');
        }
        i++;
    }

    // Boucle pour afficher les dossier de manière récursive
    i = 0;
    while (i < entries.length) {
        // Génère le chemin complet du fichier ou du dossier
        const fullPath = path + '/' + entries[i];
        // Récupère les informations de base du fichier ou du dossier
        const stat = fs.statSync(fullPath);
        // Affiche le type (fichier ou dossier) et le nom du fichier ou du dossier en sortie standard
        if (stat.isDirectory()) {
            // Saut de ligne pour respecter le format imposé
            fs.writeSync(1, '\n');
            lsdeep(fullPath);
        }
        i++;
    }
}

// On récupère le path passé en argument
const path = process.argv[2];
// On lance la fonction et on passe le path en paramètre
lsdeep(path);