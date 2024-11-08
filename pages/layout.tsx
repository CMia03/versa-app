// components/Layout.js
import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen ml-4 mr-4 md:ml-20 md:mr-20 mt-6">
            <main className="flex-1">{children}</main>
        </div>

    );
};

export default Layout;
