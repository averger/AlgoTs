type BNode = {
    value: number,
    left: BNode | null,
    right: BNode | null
}

type PrintTreeFn = (root: BNode | null) => void

export const printTree: PrintTreeFn = (root: BNode | null) => {
    let depth = 0;
    printTreeUtil(root, depth);
};

export const printTreeUtil = (root: BNode | null, depth: number) => {
    if (!root === null) {
        return;
    }
    let i = 0;
    while (i < depth) {
        if (i === depth - 1) {
            process.stdout.write("|___");
        } else {
            process.stdout.write("|   ");
        }
        i++;
    }

    process.stdout.write(root!.value + '\n');

    if (root!.right !== null) {
        printTreeUtil(root!.right, depth + 1);
    }

    if (root!.left !== null) {
        printTreeUtil(root!.left, depth + 1);
    }
}