const path = require("path") 

const HtmlWebpackPlugin = require("html-webpack-plugin") 

module.exports = { 
  entry: "./src/index.tsx",
  devtool: "source-map",
  resolve: { 
    extensions: [".ts", ".tsx", ".js", ".json"] 
  }, 
  output: { 
    path: path.join(__dirname, "/dist"), 
    filename: "index_bundle.js" 
  }, 
  module: { 
    rules: [ 
      {  
        test: /\.tsx?$/,  
        loader: "awesome-typescript-loader"  
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html"
    })
  ],
  devServer: {
    port: 3000
  } 

}