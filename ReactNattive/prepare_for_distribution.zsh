#!/bin/bash

package_name=$1

cd "$package_name"

rm "$package_name".tgz
tar -czf "$package_name".tgz package

