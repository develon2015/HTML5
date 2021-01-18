interface Category {
    category: string; // category name
    dir?: string; // dir path name
}

interface Page {
    title?: string; // html title
    path?: string; // route path
    dirname: string; // dirname
}

interface MapEl {
    category: Category;
    pages: Page[];
}

class RouterManager {
    categorys: Set<string> = new Set();
    map: {
        [key: string]: MapEl
    } = {};

    push(category: Category, pages: Page[]) {
        this.categorys.add(category.category);

        var oldData = this.map[category.category];
        this.map[category.category] = {
            category: { ...category, ...(oldData?.category || {}) }, // keep old field
            pages: [...(oldData?.pages || []), ...pages],
        };
    }

    listCategory(): string[] {
        var keys = this.categorys.keys();
        var next = keys.next();
        var values = [];
        while (!next.done) {
            values.push(next.value);
            next = keys.next();
        }
        return values;
    }
}

var manager: RouterManager = new RouterManager();
manager.push({ category: '测试', dir: 'test' }, [{ dirname: 'Test' }]);
manager.push({ category: '多媒体', dir: 'media' },
    [
        { dirname: 'video', path: 'video' },
        { dirname: 'video2canvas', title: 'canvas视频' },
    ]
);
manager.push({ category: 'CSS', dir: 'css' },
    [
        { dirname: 'filter' },
    ]
);
export default manager;
