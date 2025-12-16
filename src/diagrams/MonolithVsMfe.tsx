import { motion } from 'framer-motion';
import monolithImage from '../assets/diagrams/monolith.png';
import microfrontendImage from '../assets/diagrams/microfrontend.png';

/**
 * MonolithVsMfeDiagram - Two separate images side by side
 * Shows Monolith vs Micro-Frontend architecture clearly
 */
export const MonolithVsMfeDiagram = () => {
    return (
        <div className="w-full grid grid-cols-2 gap-8">
            {/* Monolith */}
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h3 className="text-lg font-bold text-[var(--accent-red)] mb-4">
                    Monolith
                </h3>
                <img
                    src={monolithImage}
                    alt="Monolith Architecture"
                    className="max-h-[45vh] object-contain rounded-xl border-2 border-[var(--accent-red)]/30"
                />
                <p className="mt-3 text-sm text-[var(--text-muted)] text-center">
                    Single codebase, single deploy
                </p>
            </motion.div>

            {/* Micro-Frontend */}
            <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3 className="text-lg font-bold text-[var(--accent-green)] mb-4">
                    Micro-Frontend
                </h3>
                <img
                    src={microfrontendImage}
                    alt="Micro-Frontend Architecture"
                    className="max-h-[45vh] object-contain rounded-xl border-2 border-[var(--accent-green)]/30"
                />
                <p className="mt-3 text-sm text-[var(--text-muted)] text-center">
                    Independent teams, independent deploy
                </p>
            </motion.div>
        </div>
    );
};

export default MonolithVsMfeDiagram;
