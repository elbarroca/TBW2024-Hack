import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { FaUsers, FaChartLine, FaBitcoin, FaWallet, FaSearch, FaGlobe, FaProjectDiagram, FaGamepad, FaVrCardboard, FaUserFriends, FaNewspaper, FaRobot, FaFileContract, FaBuilding, FaExchangeAlt, FaUserSecret, FaRocket, FaVoteYea, FaCalculator, FaLink } from "react-icons/fa";

export const targetAudience = [
    "Crypto traders looking to enter DeFi",
    "DeFi enthusiasts",
    "Yield farmers",
    "Crypto investors",
    "Blockchain developers",
    "Token holders",
    "Stakers and liquidity providers",
    "NFT creators and collectors",
    "Institutional investors in crypto",
    "Web3 startups",
    "Gaming guilds",
    "Metaverse explorers",
    "DAO members",
    "Crypto educators",
    "Technical analysts in crypto",
    "Crypto influencers",
    "Crypto media and reporters",
    "Algorithmic traders",
    "Smart contract developers",
    "DeFi project founders",
    "Crypto payment service providers",
    "Crypto miners",
    "Regulated financial institutions",
    "Crypto portfolio managers",
    "Cross-border payment users",
    "Privacy-focused crypto users",
    "ICO/IEO participants",
    "Token governance voters",
    "Crypto tax professionals",
    "Multi-chain ecosystem users",
] as const;

export type TargetAudienceType = typeof targetAudience[number];

const icons = [
    FaUsers, // For traders, investors, groups
    FaChartLine, // For analysts and traders
    FaBitcoin, // For crypto enthusiasts
    FaWallet, // For holders and providers
    FaSearch, // For researchers and explorers
    FaGlobe, // For global/web3 users
    FaProjectDiagram, // For developers
    FaGamepad, // For guilds and DAOs
    FaBitcoin, // For miners
    FaCalculator, // For portfolio managers
    FaExchangeAlt, // For payment providers
    FaFileContract, // For smart contract devs
    FaGlobe, // For cross-border users
    FaUserSecret, // For privacy focused users
    FaVoteYea, // For governance voters
    FaCalculator, // For tax professionals
    FaLink, // For ecosystem users
    FaRocket, // For ICO participants
    FaBuilding, // For institutional investors
    FaNewspaper, // For media and reporters
    FaUserFriends, // For influencers
    FaRobot, // For founders
    FaSearch, // For algorithmic traders
    FaChartLine, // For technical analysts
    FaBitcoin, // For NFT creators
    FaWallet, // For stakers
    FaGlobe, // For educators
    FaUsers, // For DAO members
    FaVrCardboard, // For metaverse users
    FaGamepad, // For gaming guilds
];

const TargetAudience = () => {
    return (
        <Card className="bg-white/50 backdrop-blur-sm border-purple-100/50 overflow-hidden">
            <div className="border-l-4 border-green-500 px-6 py-4 bg-green-50/50">
                <h2 className="text-2xl font-bold text-green-900">Target Audience</h2>
            </div>
            <CardContent className="p-6">
                <ScrollArea className="h-[300px] pr-4">
                    <ul className="space-y-4">
                        {targetAudience.map((audience, index) => {
                            const Icon = icons[index % icons.length];
                            return (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-green-100/50"
                                    whileHover={{ x: 4 }}
                                >
                                    <Icon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-700">{audience}</span>
                                </motion.li>
                            );
                        })}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default TargetAudience;