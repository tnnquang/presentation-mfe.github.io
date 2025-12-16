import { motion } from 'framer-motion';
import moduleFederationArchImage from '../assets/diagrams/module_federation_arch.png';

/**
 * ModuleFederationArchDiagram - Image-based diagram
 * Shows Host-Remote architecture
 */
export const ModuleFederationArchDiagram = () => {
    return (
        <motion.div
            className="w-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <img
                src={moduleFederationArchImage}
                alt="Module Federation Architecture"
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
            />
        </motion.div>
    );
};

