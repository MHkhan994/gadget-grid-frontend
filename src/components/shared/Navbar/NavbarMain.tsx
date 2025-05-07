import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { generateCategoryTree } from '@/utils/category';

async function NavbarMain() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/get-all`,
    );
    const data = await res.json();

    const categoryTree = generateCategoryTree(data.data);
    // Filter out any deleted categories
    const activeCategories = categoryTree.filter((cat) => !cat.isDeleted);

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>New Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Print</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}

export default NavbarMain;
