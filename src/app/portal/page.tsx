import { Suspense } from 'react';
import PortalOverview from '@/components/portal/PortalOverview';

export default function PortalPage() { return <Suspense fallback={<div className="min-h-screen bg-[#081120]" />}><PortalOverview /></Suspense>; }
