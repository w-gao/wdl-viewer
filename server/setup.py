from setuptools import setup, find_packages

install_requires = [
    "Flask==2.0.2",
    # "websockets==10.3",
    "requests>=2, <3",
    "wdl_parsers==0.2.0",
]

setup(name="wdl-viewer",
      version="0.0.1",
      description="The REST API for WDL viewer.",
      url="https://github.com/w-gao/wdl-viewer",
      author="William Gao",
      author_email="me@wlgao.com",
      package_dir={'': 'src'},
      packages=find_packages(where='src'),
      python_requires=">=3.6",
      install_requires=install_requires,
      license="MIT",
      classifiers=[
          'Development Status :: 3 - Alpha',
          'Environment :: Console',
          'Intended Audience :: Developers',
          'License :: OSI Approved :: MIT License',
          'Natural Language :: English',
          'Programming Language :: Python :: 3.7',
          'Programming Language :: Python :: 3.8',
          'Programming Language :: Python :: 3.9',
      ],
      keywords="WDL"
      )
