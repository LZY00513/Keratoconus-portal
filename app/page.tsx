import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Upload, FileText, TrendingUp, Calendar, Tag } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">KC Data Portal</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/browse" className="text-slate-600 hover:text-emerald-600 font-medium">
                Browse
              </Link>
              <Link href="/upload" className="text-slate-600 hover:text-emerald-600 font-medium">
                Upload
              </Link>
              <Link href="/docs" className="text-slate-600 hover:text-emerald-600 font-medium">
                Documentation
              </Link>
              <Link href="/admin" className="text-slate-600 hover:text-emerald-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Keratoconus Data
              <br />
              <span className="text-emerald-600">Sharing Portal</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Elevating Keratoconus research through collaborative data sharing. Join a community of experts and access
              vital research insights to advance our understanding of this condition.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3">
                <Link href="/browse">
                  <Database className="w-5 h-5 mr-2" />
                  Browse Datasets
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-8 py-3 bg-transparent"
              >
                <Link href="/upload">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Data
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-slate-600 hover:text-emerald-600 px-8 py-3">
                <Link href="/docs">
                  <FileText className="w-5 h-5 mr-2" />
                  Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Datasets</CardTitle>
                <Database className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">2,847</div>
                <p className="text-xs text-slate-500 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1 text-emerald-600" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">New Uploads This Month</CardTitle>
                <Upload className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">156</div>
                <p className="text-xs text-slate-500 flex items-center mt-1">
                  <Calendar className="w-3 h-3 mr-1 text-emerald-600" />
                  Updated 2 hours ago
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Most Used Tags</CardTitle>
                <Tag className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Topography
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Pentacam
                  </Badge>
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    Clinical
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-2">Based on recent activity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Advancing Keratoconus Research</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform provides researchers with the tools and data needed to make breakthrough discoveries in
              Keratoconus treatment and understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Comprehensive Data</CardTitle>
                <CardDescription className="text-slate-600">
                  Access topography, tomography, and clinical data from leading research institutions worldwide.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Easy Sharing</CardTitle>
                <CardDescription className="text-slate-600">
                  Upload and share your research data with standardized metadata and compliance checks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 bg-white">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Open Standards</CardTitle>
                <CardDescription className="text-slate-600">
                  Built on open standards with comprehensive API access and detailed documentation.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900">KC Data Portal</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2024 Keratoconus Data Sharing Portal. Advancing research through collaboration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
