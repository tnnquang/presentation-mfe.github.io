import { motion } from 'framer-motion';
import monolithVsMfeImage from '../assets/diagrams/monolith_vs_mfe.png';

/**
 * MonolithVsMfeDiagram - Image-based diagram
 * Shows transition from Monolith to Micro-Frontend architecture
 */
export const MonolithVsMfeDiagram = () => {
    return (
        <motion.div
            className="w-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <img
                src={monolithVsMfeImage}
                alt="Monolith vs Micro-Frontend Architecture"
                className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl"
            />
        </motion.div>
    );
};

